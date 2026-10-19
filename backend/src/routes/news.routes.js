const { Router } = require('express');
const router = Router();
const newsController = require('../controllers/news.controller');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads/news/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.post('/', upload.single('imagen'), newsController.createNews);
router.put('/:id', upload.single('imagen'), newsController.updateNews);
router.delete('/:id', newsController.deleteNews);

module.exports = router;
