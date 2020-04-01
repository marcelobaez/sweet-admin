import DynamicMultiField from "./DynamicMultiField";
import { Form } from "antd";

const CreateVariantForm = ({ form, handleChange, handleAddOpts }) => {
  return (
    <Form form={form} form={form} onValuesChange={handleChange}>
      <DynamicMultiField handleAddOpts={handleAddOpts} />
    </Form>
  );
};

export default CreateVariantForm;
