import React from "react";
import { Table, Divider, Popconfirm, Typography, Tag } from "antd";
import {
  EditOutlined,
  QuestionOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import { es } from "date-fns/locale";
import { config } from "../config";
import axios from "axios";

const { Text } = Typography;

const dateFormat = "dd/MM/yyy HH:mm:ss";

class ProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: "Nombre",
        dataIndex: "title",
        key: "title",
        render: text => <Text strong>{text}</Text>
      },
      {
        title: "Descripción",
        dataIndex: "description",
        key: "description",
        ellipsis: true
      },
      {
        title: "Categorías",
        dataIndex: "categories",
        key: "categories",
        render: categories => (
          <span>
            {categories.map(category => (
              <Tag color='magenta' key={category.name}>
                {category.name}
              </Tag>
            ))}
          </span>
        )
      },
      // {
      //   title: "Precio ($)",
      //   dataIndex: "price",
      //   key: "price",
      //   render: text => (
      //     <span>{new Intl.NumberFormat("es-AR").format(text)}</span>
      //   )
      // },
      {
        title: "Actualizado",
        dataIndex: "updated_at",
        key: "updated_at",
        render: text => (
          <span>{format(parseISO(text), dateFormat, { locale: es })}</span>
        )
      },
      {
        title: "Acciones",
        key: "action",
        render: (text, record) => (
          <span>
            <Link href='/edit-product/[id]' as={`/edit-product/${record.id}`}>
              <a>
                <EditOutlined style={{ marginRight: "5px" }} />
                Editar
              </a>
            </Link>
            <Divider type='vertical' />
            <Popconfirm
              title='Esta seguro?'
              icon={<QuestionOutlined style={{ color: "red" }} />}
              onConfirm={() => this.handleDelete(record.id)}
            >
              <a>
                <DeleteOutlined style={{ marginRight: "5px" }} />
                Eliminar
              </a>
            </Popconfirm>
          </span>
        )
      }
    ];
  }

  async handleDelete(id) {
    try {
      const response = await axios.delete(`${config.apiUrl}/products/${id}`);
      this.props.handleInfo(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { data, loading, pagination } = this.props;

    return (
      <Table
        rowKey='id'
        size='middle'
        pagination={pagination}
        loading={loading}
        onChange={this.props.handleTableChange}
        columns={this.columns}
        dataSource={data}
      />
    );
  }
}

export default ProductTable;
