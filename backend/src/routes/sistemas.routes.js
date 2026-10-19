const { Router } = require('express');
const router = Router();
const { getSistemas, createSistema, updateSistema, deleteSistema } = require('../controllers/sistemas.controller');

router.get('/sistemas', getSistemas);
router.post('/sistemas', createSistema);
router.put('/sistemas/:id', updateSistema);
router.delete('/sistemas/:id', deleteSistema);

module.exports = router;
