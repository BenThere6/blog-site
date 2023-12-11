const { Post } = require('../models');

const postController = {
  // Get all posts
  getAllPosts: async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [{ model: User, attributes: ['username'] }],
      });
      res.status(200).json(postData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get a single post by ID
  getPostById: async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [{ model: User, attributes: ['username'] }],
      });
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a new post
  createPost: async (req, res) => {
    try {
      const postData = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id, // This assumes you're storing user_id in the session after login
      });
      res.status(200).json(postData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update a post by ID
  updatePost: async (req, res) => {
    try {
      const postData = await Post.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: {
            id: req.params.id,
            user_id: req.session.user_id, // Ensure the user updating the post is the post creator
          },
        }
      );
      if (postData[0] === 0) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a post by ID
  deletePost: async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id, // Ensure the user deleting the post is the post creator
        },
      });
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = postController;