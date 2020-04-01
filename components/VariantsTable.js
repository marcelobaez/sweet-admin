import React, { Component } from "react";
import { Table, Tag, Avatar } from "antd";
import { tagColors } from "../utils";

const columns = [
  {
    title: "Imagen",
    dataIndex: "image_url",
    key: "image_url",
    render: imgUrl => (
      <span>
        {imgUrl.length > 0 ? (
          <Avatar shape='square' size='large' src={imgUrl} />
        ) : (
          <Avatar
            shape='square'
            size='large'
            icon='file-image'
            style={{ backgroundColor: "lightgrey" }}
          />
        )}
      </span>
    )
  },
  {
    title: "Variante",
    dataIndex: "variant",
    key: "variant",
    render: variants => (
      <span>
        {variants.map((variant, index) => {
          return (
            <Tag color={tagColors[index]} key={variant}>
              {variant}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: "Precio",
    dataIndex: "price",
    key: "price"
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock"
  }
];

class VariantsTable extends Component {
  render() {
    const { selectedVariants, data } = this.props;
    const rowSelection = {
      selectedRowKeys: selectedVariants,
      onChange: this.props.onSelectChange,
      onSelect: this.props.onSelect
    };
    const hasSelected = selectedVariants.length > 0;

    return (
      <>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 8 }}>
            {hasSelected
              ? `${selectedVariants.length} items seleccionados`
              : `Mostrando ${data} variantes`}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          rowKey='id'
          columns={columns}
          dataSource={data}
          size='middle'
        />
      </>
    );
  }
}

export default VariantsTable;
