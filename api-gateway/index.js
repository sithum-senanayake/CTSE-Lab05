const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 8080;

app.use("/items", createProxyMiddleware({
  target: "http://item-service:8081",
  changeOrigin: true,
  pathRewrite: (path, req) => {
    return '/items' + path;
  }
}));

app.use("/orders", createProxyMiddleware({
  target: "http://order-service:8082",
  changeOrigin: true,
  pathRewrite: (path, req) => {
    return '/orders' + path;
  }
}));

app.use("/payments", createProxyMiddleware({
  target: "http://payment-service:8083",
  changeOrigin: true,
  pathRewrite: (path, req) => {
    return '/payments' + path;
  }
}));

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});