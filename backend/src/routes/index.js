const { Router } = require('express');
const router = Router();
const healthController = require('../controllers/health.controller');
const directoryRoutes = require('./directory.routes');
const sliderRoutes = require('./slider.routes');
const newsRoutes = require('./news.routes');

router.use('/directory', directoryRoutes);
router.use('/slider', sliderRoutes);
router.use('/news', newsRoutes);
router.get('/health', healthController.health);
router.get('/gpc', (req, res) => {
  res.json({ items: [] });
});

module.exports = router;
