import React, { Component } from "react";
import { Button, message } from "antd";
import ProductTable from "../components/ProductTable";
import CreateProductForm from "../components/CreateProductForm";
import EditProductForm from "../components/EditProductForm";
import MainLayout from "../layouts/main";
import axios from "axios";
import { config } from "../config";

class Option extends Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);

    this.state = {
      isNewModalVisible: false,
      isEditModalVisible: false,
      selectedRecord: {},
      loading: false,
      data: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    this.setState({ loading: true });

    try {
      const response = await axios.get(`${config.apiUrl}/options`);

      this.setState({
        loading: false,
        data: response.data
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  handleSuccess = msg => {
    message.success(msg);
    this.fetchData();
  };

  handleInfo = msg => {
    message.info(msg);
    this.fetchData();
  };

  handleFailure = msg => {
    message.warning(msg);
  };

  showNewModal = () => {
    this.setState({ isNewModalVisible: true });
  };

  handleCloseNewModal = () => {
    this.setState({ isNewModalVisible: false });
  };

  handleCloseEditModal = () => {
    this.setState({ isEditModalVisible: false });
  };

  handleEdit(record) {
    this.setState({ selectedRecord: record, isEditModalVisible: true });
  }

  render() {
    const {
      isNewModalVisible,
      isEditModalVisible,
      selectedRecord,
      loading,
      data
    } = this.state;
    return (
      <React.Fragment>
        <Button
          style={{ marginBottom: "10px" }}
          icon='plus'
          key='1'
          type='primary'
          onClick={this.showNewModal}
        >
          Nuevo
        </Button>
        <CategoryTable
          data={data}
          loading={loading}
          handleEdit={this.handleEdit}
          handleInfo={this.handleInfo}
          showNewModal={this.showNewModal}
        />
        {/* <CreateCategoryForm
          visible={isNewModalVisible}
          handleCloseModal={this.handleCloseNewModal}
          handleFailure={this.handleFailure}
          handleSuccess={this.handleSuccess}
        />
        <EditCategoryForm
          visible={isEditModalVisible}
          record={selectedRecord}
          handleCloseModal={this.handleCloseEditModal}
          handleInfo={this.handleInfo}
          handleFailure={this.handleFailure}
        /> */}
      </React.Fragment>
    );
  }
}

Option.Layout = MainLayout;

export default Option;
