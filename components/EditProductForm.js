import { Form, Input, Select, InputNumber, Button } from "antd";
import UploadControl from "./UploadControl";
import axios from "axios";
import { config } from "../config";

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
};

const ProductEditForm = Form.create({ name: "edit_product_form" })(
  class extends React.Component {
    render() {
      const { onSave, form, selectData, data } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Form {...formItemLayout} onSubmit={onSave}>
          <Form.Item label='Nombre'>
            {getFieldDecorator("title", {
              initialValue: data.title,
              rules: [
                {
                  required: true,
                  message: "Por favor complete el nombre del producto!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='Portada'>
            {getFieldDecorator("cover_url", {
              valuePropName: "fileList",
              initialValue: [
                {
                  uid: "1",
                  name: `file.png`,
                  status: "done",
                  url: data.cover_url
                }
              ],
              rules: [
                {
                  required: true,
                  message: "Por favor agregue una imagen de portada!"
                }
              ]
            })(<UploadControl maxItems={1} />)}
          </Form.Item>
          <Form.Item label='Descripción'>
            {getFieldDecorator("description", {
              initialValue: data.description
            })(<TextArea rows={3} />)}
          </Form.Item>
          {/* <Form.Item label='Precio'>
            {getFieldDecorator("price", {
              initialValue: data.price,
              rules: [
                {
                  required: true,
                  message: "Por favor complete el precio del producto!"
                }
              ]
            })(
              <InputNumber
                min={0}
                max={100000}
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            )}
          </Form.Item> */}
          <Form.Item label='Categorías'>
            {getFieldDecorator("categories", {
              initialValue: data.categories
                ? data.categories.map(item => item.id)
                : []
            })(
              <Select
                mode='multiple'
                placeholder='Elija una o varias categorías'
              >
                {selectData.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 18, span: 6 }}>
            <Button
              type='primary'
              icon='save'
              htmlType='submit'
              style={{ width: "100%" }}
            >
              Guardar
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
);

class CollectionsPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
  }

  async handleSubmitForm(id, values) {
    try {
      const response = await axios.patch(
        `${config.apiUrl}/products/${id}`,
        values
      );
      if (response.status === 200) {
        this.props.handleInfo(response.data);
      }
    } catch (error) {
      console.log(error);
      // this.props.handleFailure(error);
    }
  }

  handleSave = () => {
    const { form } = this.formRef.props;
    const {
      record: { id }
    } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      const formValues = {
        ...values,
        cover_url: values.cover_url[0].url
      };

      form.resetFields();

      this.handleSubmitForm(id, formValues);
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { data, selectData } = this.props;

    return (
      <div>
        <ProductEditForm
          selectData={selectData}
          wrappedComponentRef={this.saveFormRef}
          onCancel={this.handleCancel}
          onSave={this.handleSave}
          data={data}
        />
      </div>
    );
  }
}

export default CollectionsPage;
