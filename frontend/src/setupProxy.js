const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Usar variable de entorno si está disponible, sino usar localhost (para desarrollo local)
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  app.use(
    ['/news', '/slider', '/directory', '/health', '/uploads', '/documents', '/categories', '/sistemas'],
    createProxyMiddleware({
      target: apiUrl,
      changeOrigin: true,
      logLevel: 'debug'
    })
  );
};

