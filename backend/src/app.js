const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
const path = require('path');
// ...
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/', routes);

module.exports = app;
