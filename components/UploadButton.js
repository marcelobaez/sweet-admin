import React from "react";
import { Progress } from "antd";
import { FileImageTwoTone } from "@ant-design/icons";

const UploadButton = ({ loading, percent, success }) => {
  return (
    <>
      {loading && (
        <Progress percent={Number(percent)} type='circle' width={60} />
      )}
      {!loading && (
        <FileImageTwoTone
          style={{ fontSize: "32px", marginBottom: "8px" }}
          twoToneColor='#eb2f96'
        />
      )}
      <p>{`${loading ? "Cargando" : "Subir"}`}</p>
    </>
  );
};

export default UploadButton;
