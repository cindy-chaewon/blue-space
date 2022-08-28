const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/member',
    createProxyMiddleware({
      target: 'http://3.37.214.20:8080',
      changeOrigin: true,
    })
  );
};