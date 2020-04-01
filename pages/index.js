import { Card, Col, Divider, Row, Statistic, Typography } from "antd";
import { motion } from "framer-motion";
import MainLayout from "../layouts/main";

const { Title, Text } = Typography;

const Index = () => {
  return (
    <motion.div
      initial='initial'
      animate='enter'
      exit='exit'
      variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
    >
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Title level={2}>Hola Marcelo!</Title>
          <Text>Estas son las estadísticas de esta semana</Text>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title='Ventas totales' value={112893} prefix='$' />
            <Divider style={{ margin: "10px 0" }} />
            <Text type='secondary'>Ventas diarias </Text>
            <Text strong> $ 1200</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title='Visitas' value={2398} />
            <Divider style={{ margin: "10px 0" }} />
            <Text type='secondary'>Ventas diarias </Text>
            <Text strong> $ 1200</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Text type='secondary'>Ant Design</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Text type='secondary'>Ant Design</Text>
          </Card>
        </Col>
      </Row>
    </motion.div>
  );
};

Index.Layout = MainLayout;

export default Index;
