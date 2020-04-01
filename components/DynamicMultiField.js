import React from "react";
import { PlusOutlined, DeleteTwoTone } from "@ant-design/icons";
import { Form, Divider, Button, Select, Input, Tag, Row, Col } from "antd";
import { tagColors } from "../utils";

const DynamicField = ({ handleAddOpts }) => {
  const tagRender = (props, index) => {
    const { label, closable, onClose } = props;

    return (
      <Tag
        color={tagColors[index]}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <>
      <Form.List name='fields'>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field, index) => (
                <Form.Item key={field.key}>
                  <Divider>Opción {index + 1}</Divider>
                  <Row align='middle' justify='center'>
                    <Col span={21}>
                      <Form.Item
                        wrapperCol={{ span: 18 }}
                        labelCol={{ span: 4 }}
                        name={[index, "name"]}
                        label='Nombre'
                        rules={[
                          {
                            required: true,
                            whitespace: false,
                            message: "Debe ingresar un nombre."
                          }
                        ]}
                        validateTrigger={["onChange", "onBlur"]}
                      >
                        <Input placeholder='Ej: Talle, Color' />
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{ span: 18 }}
                        labelCol={{ span: 4 }}
                        label='Valores'
                        name={[index, "values"]}
                        rules={[
                          {
                            required: true,
                            message: "Debe asignar al menos un valor."
                          }
                        ]}
                      >
                        <Select
                          mode='tags'
                          placeholder='Valores separados por coma'
                          tokenSeparators={[","]}
                          tagRender={props => tagRender(props, index)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      {fields.length > 0 ? (
                        <DeleteTwoTone
                          style={{ fontSize: "20px" }}
                          twoToneColor='#eb2f96'
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Col>
                  </Row>
                </Form.Item>
              ))}

              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button
                  type='dashed'
                  onClick={() => {
                    add();
                    handleAddOpts();
                  }}
                  style={{ width: "100%" }}
                >
                  <PlusOutlined /> Añadir opción
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </>
  );
};

export default DynamicField;
