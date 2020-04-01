import React, { Component } from "react";
import { Empty, Row, Col, Card } from "antd";
import EditProductForm from "../../../components/EditProductForm";
import CreateVariantForm from "../../../components/CreateVariantForm";
import MainLayout from "../../../layouts/main";
import fetch from "isomorphic-unfetch";
import { config } from "../../../config";

class EditProduct extends Component {
  static async getInitialProps(ctx) {
    const { id } = ctx.query;

    try {
      const productRes = await fetch(`${config.apiUrl}/products/${id}`);
      const productJson = await productRes.json();

      const categoriesRes = await fetch(`${config.apiUrl}/categories`);
      const categoriesJson = await categoriesRes.json();

      return { product: productJson[0], categories: categoriesJson };
    } catch (error) {
      console.log(error);
    }
  }

  state = {
    hasVariants: this.props.product.options.length > 0,
    showOptions: false
  };

  handleFormChange = changedFields => {
    console.log(changedFields);
  };

  handleToggleOptions = e => {
    this.setState({ showOptions: !this.state.showOptions });
  };

  render() {
    const { product, categories } = this.props;
    const { hasVariants, showOptions } = this.state;

    return (
      <Row gutter={16}>
        <Col span={12}>
          <Card title='Información del producto' bordered={false}>
            <EditProductForm data={product} selectData={categories} />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title='Variantes'
            bordered={false}
            bodyStyle={{ textAlign: "center" }}
            extra={
              hasVariants ? null : (
                <a onClick={this.handleToggleOptions}>{`${
                  showOptions ? "Cancelar" : "Agregar variante"
                }`}</a>
              )
            }
          >
            {!hasVariants && !showOptions && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={false}
                style={{ marginBottom: "15px" }}
              />
            )}
            <p style={{ marginBottom: "15px" }}>
              Puede agregar variantes al producto como Talle, Color
            </p>
            {/* {showOptions && (
              <CreateVariantForm onChange={this.handleFormChange} />
            )} */}
          </Card>
        </Col>
      </Row>
    );
  }
}

EditProduct.Layout = MainLayout;

export default EditProduct;
