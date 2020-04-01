import React, { Component } from "react";
import { Form, Icon, Button } from "antd";
import PropTypes from "prop-types";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 }
  }
};

const formItemCenteredWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 4 }
  }
};

class DynamicFields extends Component {
  id = 1;

  add = () => {
    const { getFieldValue, setFieldsValue, name } = this.props,
      keys = getFieldValue(`${name}List`),
      nextKeys = keys.concat(this.id++);

    setFieldsValue({
      [`${name}List`]: nextKeys
    });
  };

  remove = k => () => {
    const { getFieldValue, setFieldsValue, name } = this.props,
      keys = getFieldValue(`${name}List`);

    if (keys.length === 1) return;
    setFieldsValue({
      [`${name}List`]: keys.filter(key => key !== k)
    });
  };

  defaultValidation = name => ({
    validateTrigger: ["onChange", "onBlur"],
    rules: [
      {
        required: true,
        whitespace: true,
        message: `Please input ${name}.`
      }
    ]
  });

  addSingleField = () => {
    const { getFieldDecorator, getFieldValue, fields: obj, name } = this.props;
    getFieldDecorator(`${name}List`, { initialValue: [0] });
    const fieldCounter = getFieldValue(`${name}List`);
    return fieldCounter.map(k => (
      <Form.Item key={k} {...formItemLayoutWithOutLabel}>
        {getFieldDecorator(
          `${name}[${k}]`,
          obj.validation || this.defaultValidation(name)
        )(obj.field())}
        {fieldCounter.length > 1 ? (
          <Icon
            className='dynamic-delete-button'
            type='delete'
            onClick={this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
  };

  addMultipleFields = () => {
    const { getFieldDecorator, getFieldValue, fields, name } = this.props;
    getFieldDecorator(`${name}List`, { initialValue: [0] });
    const fieldCounter = getFieldValue(`${name}List`);

    return fieldCounter.reduce((preResult, k) => {
      const row = fields.map((obj, i) => (
        <Form.Item
          {...(k === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={k === 0 ? obj.label : null}
          key={`${k}${obj.name}`}
        >
          {getFieldDecorator(
            `${name}[${k}][${obj.name}]`,
            obj.validation || this.defaultValidation(name)
          )(obj.field())}
          {fieldCounter.length > 1 && fields.length - 1 === i ? (
            <Icon
              className='dynamic-delete-button'
              type='delete'
              onClick={this.remove(k)}
            />
          ) : null}
        </Form.Item>
      ));

      return [...preResult, ...row];
    }, []);
  };

  render() {
    const { fields, name } = this.props;
    return (
      <>
        {Array.isArray(fields)
          ? this.addMultipleFields()
          : this.addSingleField()}
        <Form.Item {...formItemCenteredWithOutLabel}>
          <Button type='dashed' onClick={this.add} style={{ width: "100%" }}>
            <Icon type='plus' />
            {name}
          </Button>
        </Form.Item>
      </>
    );
  }
}

DynamicFields.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
    //TODO: add object shape validation.
  ]).isRequired,
  getFieldValue: PropTypes.func.isRequired,
  setFieldsValue: PropTypes.func.isRequired
};

export default DynamicFields;
