const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // IMPORTANTE: Dentro de Docker, el backend siempre es 'http://api:3001'
  const apiUrl = 'http://api:3001';

  app.use(
    ['/news', '/health', '/uploads', '/documents', '/sliders'],
    createProxyMiddleware({
      target: apiUrl,
      changeOrigin: true,
      logLevel: 'debug',
      secure: false, // Permitir conexiones HTTP/HTTPS autogestionadas
      xfwd: true     // Pasar las cabeceras de proxy de Docker
    })
  );
};

