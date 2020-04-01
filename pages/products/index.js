import React, { useState } from "react";
import { Button, Col, Result, Row, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import ProductTable from "../../components/ProductTable";
import { motion } from "framer-motion";
import MainLayout from "../../layouts/main";
import useRequest from "../../lib/useRequest";
import { config } from "../../config";

function Products() {
  const [pager, setPagination] = useState({
    pageSize: 5,
    current: 1
  });

  const { data, error } = useRequest({
    url: `${config.apiUrl}/products`,
    params: {
      page: pager.current,
      pageSize: pager.pageSize
    }
  });

  let pagination;

  if (data) {
    pagination = {
      pageSize: data.perPage,
      current: data.page,
      total: parseInt(data.total),
      pageSizeOptions: ["5", "10", "15", "20"],
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: total => `Total ${total} items`
    };
  }

  async function handleTableChange(pages, filters, sorter) {
    setPagination({
      pageSize: pages.pageSize,
      current: pages.current
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Row gutter={16}>
        <Col style={{ background: "#fff" }}>
          <Row>
            <Col span={24}>
              <Link href='/products/new'>
                <Button
                  icon={<PlusOutlined />}
                  style={{ float: "right", margin: "10px 0px" }}
                  key='1'
                  type='primary'
                >
                  Nuevo
                </Button>
              </Link>
            </Col>
            <Col span={24}>
              {error ? (
                <Result
                  status='500'
                  title='500'
                  subTitle={error.message}
                  extra={<Button type='primary'>Volver al inicio</Button>}
                />
              ) : data ? (
                <ProductTable
                  data={data.data}
                  pagination={pagination}
                  handleTableChange={handleTableChange}
                />
              ) : (
                <div className='spin-container'>
                  <Spin size='large' tip='Cargando...' />
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <style jsx>
        {`
          .spin-container {
            text-align: center;
            background: rgba(0, 0, 0, 0.05);
            border-radius: 4px;
            margin-bottom: 20px;
            padding: 30px 50px;
            margin: 20px 0;
            width: 100%;
            vertical-align: middle;
          }
        `}
      </style>
    </motion.div>
  );
}

Products.Layout = MainLayout;

export default Products;
