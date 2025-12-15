const { Router } = require('express');
const router = Router();
const documentsController = require('../controllers/documents.controller');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads/documents/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Use only timestamp for shorter filenames
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', documentsController.getAll);
router.post('/', upload.single('archivo'), documentsController.create);
router.put('/:id', upload.single('archivo'), documentsController.update);
router.delete('/:id', documentsController.remove);

module.exports = router;
