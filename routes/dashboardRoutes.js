const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');

// Dashboard routes
router.get('/', dashboardController.getUserDashboard);

module.exports = router;