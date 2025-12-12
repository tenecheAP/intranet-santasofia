const { Router } = require('express');
const router = Router();
const documentsController = require('../controllers/documents.controller');

router.get('/', documentsController.getAll);
router.post('/', documentsController.create);
router.put('/:id', documentsController.update);
router.delete('/:id', documentsController.remove);

module.exports = router;
