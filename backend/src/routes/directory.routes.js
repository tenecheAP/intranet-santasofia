const { Router } = require('express');
const router = Router();
const directoryController = require('../controllers/directory.controller');

router.get('/', directoryController.getAll);
router.post('/', directoryController.create);
router.put('/:id', directoryController.update);
router.delete('/:id', directoryController.remove);

module.exports = router;
