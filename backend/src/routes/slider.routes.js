const { Router } = require('express');
const router = Router();
const sliderController = require('../controllers/slider.controller');
const multer = require('multer');
const path = require('path');

const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads/sliders/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // If file already exists, keep the original name to avoid duplicates
        if (fs.existsSync(path.join(uploadDir, file.originalname))) {
            cb(null, file.originalname);
        } else {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    }
});

const upload = multer({ storage: storage });

router.get('/', sliderController.getAll);
router.get('/:id', sliderController.getById);
router.post('/', upload.single('imagen'), sliderController.create);
router.put('/:id', upload.single('imagen'), sliderController.update);
router.delete('/:id', sliderController.remove);

module.exports = router;
