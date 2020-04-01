import React, { Component } from "react";
import { Upload, Modal } from "antd";
import UploadButton from "./UploadButton";
import { getBase64 } from "../utils";
import uuidv1 from "uuid/v1";
import axios from "axios";
import { config } from "../config";

const imgTransform = "w_900,c_scale,q_80|w_200,c_fill,g_auto";

class UploadControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: false,
      percent: 0,
      previewVisible: false,
      previewImage: ""
    };

    this.handleFinishUpload = this.handleFinishUpload.bind(this);
    this.handlePercentChange = this.handlePercentChange.bind(this);
    this.handleStartUploading = this.handleStartUploading.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFinishUpload(response) {
    const newFile = [
      {
        uid: response.etag,
        url: response.eager[0].url,
        preview: response.eager[1].url,
        status: "done",
        response: { status: "success" }
      }
    ];

    this.setState({
      loading: false,
      success: true
    });

    this.triggerChange(newFile);
  }

  handlePercentChange(percent) {
    this.setState({ percent: percent });
  }

  handleStartUploading() {
    this.setState({ loading: true });
  }

  handlePreview = async file => {
    this.setState({
      previewImage: file.url,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  handleCancel = () => {
    this.setState({ previewVisible: false });
  };

  render() {
    const {
      loading,
      percent,
      previewVisible,
      previewImage,
      success
    } = this.state;

    const {
      handleChange,
      handlePreview,
      handleFinishUpload,
      handleStartUploading,
      handlePercentChange
    } = this;

    const { maxItems } = this.props;

    const uploadProps = {
      accept: ".jpg,.jpeg.,.png,.heic",
      multiple: false,
      listType: "picture-card",
      fileList: this.props.fileList,
      showUploadList: true,
      onChange: handleChange,
      onPreview: handlePreview,
      onSuccess(response, file) {
        handleFinishUpload(response);
      },
      onError(err) {
        console.log("onError", err);
      },
      onStart(file) {
        handleStartUploading();
      },
      onProgress({ percent }, file) {
        handlePercentChange(percent);
      },
      async customRequest({ file, onError, onProgress, onSuccess }) {
        const cloudReq = {
          timestamp: Math.round(Date.now() / 1000),
          eager: imgTransform,
          upload_preset: "z0inc5gg",
          public_id: uuidv1()
        };

        try {
          const signedRequest = await axios.post(
            `${config.apiUrl}/sign-cloud`,
            cloudReq
          );

          const base64File = await getBase64(file);

          const uploadParams = {
            timestamp: cloudReq.timestamp,
            signature: signedRequest.data.signature,
            file: base64File,
            eager: imgTransform,
            api_key: signedRequest.data.apiKey,
            upload_preset: "z0inc5gg",
            public_id: cloudReq.public_id
          };

          const uploadCloud = await axios.post(
            config.cloudApiUrl,
            uploadParams,
            {
              headers: {
                "X-Requested-With": "XMLHttpRequest"
              },
              onUploadProgress: ({ total, loaded }) => {
                onProgress(
                  {
                    percent: Math.round((loaded / total) * 100).toFixed(2)
                  },
                  file
                );
              }
            }
          );
          onSuccess(uploadCloud.data, file);
        } catch (error) {
          console.log(error);
        }
      }
    };

    return (
      <>
        <Upload {...uploadProps}>
          {uploadProps.fileList.length >= maxItems ? null : (
            <UploadButton
              loading={loading}
              success={success}
              percent={percent}
            />
          )}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt='thumbnail' style={{ width: "100%" }} src={previewImage} />
        </Modal>
        <style jsx global>
          {`
            .ant-modal-body {
              padding: 0px;
            }
          `}
        </style>
      </>
    );
  }
}

export default UploadControl;
