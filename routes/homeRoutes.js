const router = require('express').Router();
const homeController = require('../controllers/homeController');

// Home routes
router.get('/', homeController.getHomepage);
router.get('/posts/:id', homeController.getPostById);

module.exports = router;