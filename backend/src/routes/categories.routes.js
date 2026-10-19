const { Router } = require('express');
const router = Router();
const categoriesController = require('../controllers/categories.controller');

router.get('/', categoriesController.getAll);
router.post('/', categoriesController.create);
router.put('/:id', categoriesController.update);
router.delete('/:id', categoriesController.remove);

module.exports = router;
