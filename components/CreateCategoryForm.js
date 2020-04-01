import { Modal, Form, Input } from "antd";
import axios from "axios";
import { config } from "../config";

const CategoryCreateForm = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title='Crear una categoria'
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout='horizontal'>
            <Form.Item label='Nombre'>
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Por favor complete el nombre!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class CollectionsPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreate = this.handleCreate.bind(this);
  }

  async handleSubmitForm(values) {
    try {
      const response = await axios({
        method: "post",
        url: `${config.apiUrl}/categories`,
        data: values
      });

      this.props.handleSuccess(response.data.message);
    } catch (error) {
      this.props.handleFailure(error.message);
    }
  }

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      form.resetFields();

      this.handleSubmitForm(values);

      this.props.handleCloseModal();
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <CategoryCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.props.visible}
          onCancel={this.props.handleCloseModal}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default CollectionsPage;
