const { Router } = require('express');
const router = Router();
const healthController = require('../controllers/health.controller');

router.get('/health', healthController.health);
router.get('/gpc', (req, res) => {
  res.json({ items: [] });
});

module.exports = router;
