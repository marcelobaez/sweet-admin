import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal, PageHeader, Row } from "antd";
import { ExclamationCircleOutlined, SkinOutlined } from "@ant-design/icons";
import CreateProductForm from "../../components/CreateProductForm";
import CreateVariantForm from "../../components/CreateVariantForm";
import VariantsTable from "../../components/VariantsTable";
import MainLayout from "../../layouts/main";
import fetch from "isomorphic-unfetch";
import { motion } from "framer-motion";
import axios from "axios";
import { config } from "../../config";
import { combine } from "../../utils";

const { confirm } = Modal;

const newProduct = props => {
  const [hasOptions, toggleOptions] = useState(false);
  const [showVariantsTable, toggleVariants] = useState(false);
  const [selectedVariants, setVariants] = useState([]);
  const [options, setOptions] = useState([]);
  const [variantsData, setVariantsData] = useState([]);
  const [data, setData] = useState({});
  const [productForm] = Form.useForm();
  const [variantsForm] = Form.useForm();

  useEffect(() => {
    productForm.setFieldsValue(
      {
        name: ["title"],
        value: ""
      },
      {
        name: ["cover_url"],
        valuePropName: "fileList",
        value: []
      },
      {
        name: ["description"],
        value: ""
      },
      {
        name: ["price"],
        value: 1000
      }
    );
  }, []);

  const handleAddOpts = () => {
    toggleOptions(true);
  };

  const handleSubmitForm = async values => {
    try {
      const response = await axios.post(`${config.apiUrl}/products`, values);
      if (response.status === 201) {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      const productInfo = await productForm.validateFields();
      const optionsInfo = await variantsForm.validateFields();
      const { categories, ...filteredValues } = productInfo;

      const data = {
        product: {
          ...filteredValues,
          cover_url: filteredValues.cover_url[0].url
        },
        ...(categories &&
          categories.length > 0 && {
            categories
          }),
        ...(options.length > 0 && { options })
        // ...(combinations.length > 0 && { combinations })
      };
      console.log(data);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const handleSetVariants = () => {
    variantForm.current.validateFields((err, values) => {
      if (!err) {
        const opts = [];

        values.Opcion.forEach(item => {
          opts.push(item.optionValues);
        });

        const combined = combine(opts);

        let selectedVariants = [];

        const variantsData = combined.map((item, index) => {
          selectedVariants.push(index);
          return {
            id: index,
            image_url: "",
            variant: item,
            price: 200,
            stock: 3
          };
        });

        setOptions(values.Opcion);
        setVariantsData(variantsData);
        toggleVariants(true);
        setVariants(selectedVariants);
      } else {
        console.log("Problemas de validación", err);
      }
    });
  };

  const handleDeleteOpts = async () => {
    await variantsForm.resetFields();
    setOptions([]);
    setVariantsData([]);
    toggleVariants(false);
    toggleOptions(false);
    setVariants([]);
  };

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRows);
    setVariants(selectedRowKeys);
  };

  const handleOptionsChange = (cv, av) => {
    // console.log(cv);
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Estas seguro/a?",
      icon: <ExclamationCircleOutlined />,
      content: "Se borrarán las opciones agregadas",
      okText: "Eliminar",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteOpts();
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  // const onSelect = (record, selected) => {
  //   if (!selected) {
  //     const { combinations } = this.state;
  //     const filtered = combinations.filter(
  //       item => JSON.stringify(item) !== JSON.stringify(record.variant)
  //     );
  //     this.setState({ combinations: filtered });
  //   }
  // };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Row gutter={[16, 16]}>
        <Col span={8} offset={16}>
          <>
            <Button
              onClick={handleSave}
              type='primary'
              style={{ float: "right" }}
            >
              Guardar
            </Button>
            <Button type='link' danger style={{ float: "right" }}>
              Descartar
            </Button>
          </>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card title='Informacion principal'>
            <CreateProductForm
              selectData={props.categories}
              form={productForm}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title='Variantes'
            extra={
              hasOptions ? (
                <Button onClick={showDeleteConfirm} type='link' danger>
                  Cancelar
                </Button>
              ) : null
            }
          >
            {
              <>
                <p style={{ marginBottom: "15px" }}>
                  Puede agregar variantes al producto como Talle, Color
                </p>
                <CreateVariantForm
                  handleChange={handleOptionsChange}
                  handleAddOpts={handleAddOpts}
                  form={variantsForm}
                />
              </>
            }

            {/* {showOptions && (
                  <>
                    {showVariantsTable && (
                      <VariantsTable
                        onSelectChange={onSelectChange}
                        // onSelect={onSelect}
                        data={variantsData}
                        selectedVariants={selectedVariants}
                      />
                    )}
                  </>
                )} */}
          </Card>
        </Col>
      </Row>
    </motion.div>
  );
};

newProduct.Layout = MainLayout;

newProduct.getInitialProps = async ctx => {
  try {
    const categoriesRes = await fetch(`${config.apiUrl}/categories`);
    const categoriesJson = await categoriesRes.json();

    return { categories: categoriesJson };
  } catch (error) {
    console.log(error);
  }
};

export default newProduct;
