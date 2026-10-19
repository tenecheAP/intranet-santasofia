const { Router } = require('express');
const router = Router();
const { verifyToken } = require('../middleware/auth.middleware');
const analyticsController = require('../controllers/analytics.controller');

// Registro de visitas (público - acepta visitantes anónimos)
router.post('/track', analyticsController.trackVisit);

// Consultas de estadísticas (idealmente proteger con auth de admin)
router.get('/overview', verifyToken, analyticsController.getOverview);
router.get('/top-pages', verifyToken, analyticsController.getTopPages);
router.get('/visits-by-date', verifyToken, analyticsController.getVisitsByDate);
router.get('/visits-by-hour', verifyToken, analyticsController.getVisitsByHour);
router.get('/devices', verifyToken, analyticsController.getDeviceStats);
router.get('/browsers', verifyToken, analyticsController.getBrowserStats);
router.get('/active-users', verifyToken, analyticsController.getActiveUsers);
router.get('/monthly-summary', verifyToken, analyticsController.getMonthlySummary);

module.exports = router;
