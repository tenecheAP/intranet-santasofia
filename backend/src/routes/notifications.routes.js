const { Router } = require('express');
const router = Router();
const notificationsController = require('../controllers/notifications.controller');

router.get('/', notificationsController.getAllNotifications);
router.get('/active', notificationsController.getActiveNotifications);
router.post('/', notificationsController.createNotification);
router.put('/:id', notificationsController.updateNotification);
router.patch('/:id/toggle', notificationsController.toggleNotification);
router.delete('/:id', notificationsController.deleteNotification);

module.exports = router;

