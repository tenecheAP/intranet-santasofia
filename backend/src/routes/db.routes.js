const { Router } = require('express');
const router = Router();
const dbController = require('../controllers/db.controller');
const multer = require('multer');
const path = require('path');

// Configure multer for temporary storage of restore files
const upload = multer({
    dest: 'uploads/temp/',
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname).toLowerCase() === '.sql') {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos .sql'));
        }
    }
});

router.get('/backup', dbController.backup);
router.post('/restore', upload.single('backup'), dbController.restore);

module.exports = router;
