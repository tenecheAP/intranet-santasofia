const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const path = require('path');
const fs = require('fs');

const app = express();

// Asegurar que existen las carpetas de subida
const uploadDirs = [
    path.join(__dirname, '../uploads'),
    path.join(__dirname, '../uploads/documents'),
    path.join(__dirname, '../uploads/temp')
];
uploadDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/', routes);

module.exports = app;
