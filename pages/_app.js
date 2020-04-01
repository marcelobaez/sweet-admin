import React from "react";
import App from "next/app";
import { ConfigProvider } from "antd";
import esES from "antd/lib/locale/es_ES";
import { AnimatePresence } from "framer-motion";

const Noop = ({ children }) => children;

export default class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const Layout = Component.Layout || Noop;

    return (
      <ConfigProvider locale={esES}>
        <Layout>
          <AnimatePresence exitBeforeEnter initial={false}>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
      </ConfigProvider>
    );
  }
}
