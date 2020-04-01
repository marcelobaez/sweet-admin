import { Form, Input, Select, InputNumber, Tag } from "antd";
import UploadControl from "./UploadControl";

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 }
  }
};

const tagRender = props => {
  const { label, closable, onClose } = props;

  return (
    <Tag
      color='magenta'
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

const createProductForm = ({ selectData, form }) => {
  return (
    <Form
      {...formItemLayout}
      colon={false}
      form={form}
      name='global_state'
      initialValues={{ cover_url: [], price: 1000 }}
      onFieldsChange={(changedFields, allFields) => {
        // console.log(allFields);
      }}
    >
      <Form.Item
        name='title'
        label='Nombre'
        rules={[
          {
            required: true,
            message: "Por favor complete el nombre del producto!"
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Portada'
        name='cover_url'
        valuePropName='fileList'
        rules={[
          {
            required: true,
            message: "Por favor agregue una imagen de portada!"
          }
        ]}
        valuePropName='fileList'
      >
        <UploadControl maxItems={1} />
      </Form.Item>
      <Form.Item label='Descripción' name='description'>
        <TextArea rows={3} />
      </Form.Item>
      <Form.Item
        label='Precio'
        name='price'
        rules={[
          {
            required: true,
            message: "Por favor complete el precio del producto!"
          }
        ]}
      >
        <InputNumber
          min={0}
          max={100000}
          parser={value => value.replace(/\$\s?|(,*)/g, "")}
          formatter={value =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
        />
      </Form.Item>
      <Form.Item label='Categorías' name='categories'>
        <Select
          tagRender={tagRender}
          mode='multiple'
          placeholder='Elija una o varias categorías'
        >
          {selectData.map(item => (
            <Option key={item.id}>{item.name}</Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default createProductForm;
