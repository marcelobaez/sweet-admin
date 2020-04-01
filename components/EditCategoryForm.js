import { Modal, Form, Input } from "antd";
import axios from "axios";
import { config } from "../config";

const CategoryEditForm = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, record } = this.props;
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
                initialValue: record.name,
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

  async handleSubmitForm(id, values) {
    try {
      const response = await axios.patch(
        `${config.apiUrl}/categories/${id}`,
        values
      );

      if (response.status === 204) {
        this.props.handleInfo(response.data.message);
      }
    } catch (error) {
      this.props.handleFailure(error.response.statusText);
    }
  }

  handleCancel = () => {
    const { form } = this.formRef.props;
    form.resetFields();
    this.props.handleCloseModal();
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    const {
      record: { id }
    } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      form.resetFields();

      this.handleSubmitForm(id, values);

      this.props.handleCloseModal();
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { record } = this.props;
    return (
      <div>
        <CategoryEditForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.props.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          record={record}
        />
      </div>
    );
  }
}

export default CollectionsPage;
