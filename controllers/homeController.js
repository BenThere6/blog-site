const { Post, User, Comment } = require('../models');

const homeController = {
  // Get all posts for the homepage
  getHomepage: async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          { model: User, attributes: ['username'] },
          { model: Comment, include: [{ model: User, attributes: ['username'] }] },
        ],
      });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.status(200).render('home', { posts, logged_in: req.session.logged_in });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = homeController;