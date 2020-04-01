import React, { forwardRef } from "react";
import { Input, Select } from "antd";

function CustomInput({ value, onChange }, ref) {
  const triggerChange = changedValue => {
    if (onChange) {
      onChange({
        ...value,
        ...changedValue
      });
    }
  };

  return (
    <span ref={ref}>
      <Input
        placeholder='Nombre, ej: Talle'
        style={{ width: "30%", marginRight: "3%" }}
        onChange={e => {
          triggerChange({ optionName: e.target.value });
        }}
      />
      <Select
        mode='tags'
        style={{ width: "62%", marginRight: "1%" }}
        placeholder='Valores separados por coma'
        tokenSeparators={[","]}
        onChange={value => {
          triggerChange({ optionValues: value });
        }}
      />
    </span>
  );
}

CustomInput = forwardRef(CustomInput);

export default CustomInput;
