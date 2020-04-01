import React from "react";
import { Table, Divider, Popconfirm, Typography, Icon } from "antd";
import { parseISO, format } from "date-fns";
import { es } from "date-fns/locale";
import { config } from "../config";
import axios from "axios";

const { Text } = Typography;

const dateFormat = "dd/MM/yyy HH:mm:ss";

class CategoryTable extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: "Nombre",
        dataIndex: "name",
        key: "name",
        render: text => <Text strong>{text}</Text>
      },
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
            <a onClick={() => this.props.handleEdit(record)}>
              <Icon type='edit' style={{ marginRight: "5px" }} />
              Editar
            </a>
            <Divider type='vertical' />
            <Popconfirm
              title='Esta seguro?'
              icon={<Icon type='question-circle-o' style={{ color: "red" }} />}
              onConfirm={() => this.handleDelete(record.id)}
            >
              <a>
                <Icon type='delete' style={{ marginRight: "5px" }} />
                Eliminar
              </a>
            </Popconfirm>
          </span>
        )
      }
    ];

    this.state = {
      pagination: {
        pageSize: 5,
        current: 1,
        pageSizeOptions: ["5", "10", "15", "20"],
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: total => `Total ${total} items`
      }
    };
  }

  async handleDelete(id) {
    try {
      const response = await axios.delete(`${config.apiUrl}/categories/${id}`);
      this.props.handleInfo(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { data, loading } = this.props;
    const { pagination } = this.state;

    return (
      <Table
        rowKey='id'
        size='middle'
        pagination={pagination}
        loading={loading}
        onChange={this.handleTableChange}
        columns={this.columns}
        dataSource={data}
      />
    );
  }
}

export default CategoryTable;
