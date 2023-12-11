const { Comment } = require('../models');

const commentController = {
  // Get all comments for a post
  getCommentsByPostId: async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        where: { post_id: req.params.postId },
        include: [{ model: User, attributes: ['username'] }],
      });
      res.status(200).json(commentData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a new comment
  createComment: async (req, res) => {
    try {
      const commentData = await Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id, // This assumes you're storing user_id in the session after login
        post_id: req.params.postId,
      });
      res.status(200).json(commentData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update a comment by ID
  updateComment: async (req, res) => {
    try {
      const commentData = await Comment.update(
        {
          comment_text: req.body.comment_text,
        },
        {
          where: {
            id: req.params.id,
            user_id: req.session.user_id, // Ensure the user updating the comment is the comment creator
          },
        }
      );
      if (commentData[0] === 0) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.status(200).json(commentData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a comment by ID
  deleteComment: async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id, // Ensure the user deleting the comment is the comment creator
        },
      });
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.status(200).json(commentData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = commentController;