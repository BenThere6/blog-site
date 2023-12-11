const { Post, User } = require('../models');

const dashboardController = {
  // Get all posts for the user's dashboard
  getUserDashboard: async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: { user_id: req.session.user_id }, // Assuming user_id is stored in the session after login
        include: [{ model: User, attributes: ['username'] }],
      });
      const userPosts = postData.map((post) => post.get({ plain: true }));
      res.status(200).render('dashboard', { userPosts, logged_in: req.session.logged_in });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = dashboardController;