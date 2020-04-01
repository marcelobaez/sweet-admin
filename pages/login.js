import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";

const login = props => {
  const { getFieldDecorator } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [
              { required: true, message: "Por favor ingresa tu usuario!" }
            ]
          })(
            <Input
              prefix={<Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder='Email'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "Por favor ingresa la contraseña!" }
            ]
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />}
              type='password'
              placeholder='Contraseña'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Recordarme</Checkbox>)}
          <a className='login-form-forgot' href=''>
            Olvide mi contraseña
          </a>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Iniciar sesión
          </Button>
        </Form.Item>
      </Form>
      <style jsx>
        {`
          .login-form {
            max-width: 300px;
          }
          .login-form-forgot {
            float: right;
          }
          .login-form-button {
            width: 100%;
          }
        `}
      </style>
    </>
  );
};

export default Form.create({ name: "normal_login" })(login);
