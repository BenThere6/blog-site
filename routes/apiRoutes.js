const router = require('express').Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

// User routes
router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

// Post routes
router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);
router.post('/posts', postController.createPost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

// Comment routes
router.get('/comments/:postId', commentController.getCommentsByPostId);
router.post('/comments/:postId', commentController.createComment);
router.put('/comments/:id', commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;