const { Router } = require('express');
const router = Router();
const healthController = require('../controllers/health.controller');
const directoryRoutes = require('./directory.routes');
const sliderRoutes = require('./slider.routes');
const newsRoutes = require('./news.routes');
const documentsRoutes = require('./documents.routes');
const categoriesRoutes = require('./categories.routes');
const sistemasRoutes = require('./sistemas.routes');
const dbRoutes = require('./db.routes');

router.use('/directory', directoryRoutes);
router.use('/slider', sliderRoutes);
router.use('/news', newsRoutes);
router.use('/documents', documentsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/db', dbRoutes);
router.use(sistemasRoutes);
router.get('/health', healthController.health);
router.get('/gpc', (req, res) => {
  res.json({ items: [] });
});

module.exports = router;
