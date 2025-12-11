const { Router } = require('express');
const router = Router();
const sliderController = require('../controllers/slider.controller');
const multer = require('multer');
const path = require('path');

// Configure Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', sliderController.getAll);
router.get('/:id', sliderController.getById);
router.post('/', upload.single('imagen'), sliderController.create);
router.put('/:id', upload.single('imagen'), sliderController.update);
router.delete('/:id', sliderController.remove);

module.exports = router;
