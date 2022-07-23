const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection')

//Get all posts - api/posts
router.get('/', (req, res) => {
  Post.findAll({
    order: [['created_at', 'DESC']],
    attributes: [
      'id',
      'post_content',
      'title',
      'created_at'
    ],
    include: [
      // Comment model
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        //shows username of user who made the comment
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        //shows the username of user who created the post
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get single blog post - /api/posts/id
router.get('/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      //to retrieve id of requested post
      id: req.params.id
    },
    attributes: [
      'id',
      'post_content',
      'title',
      'created_at'
    ],
    include: [
      // include the Comment model
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        //show the username of user who made the comment
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        //show the username of user who created the post
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//Create Pose - api/posts
router.post('/', withAuth, (req, res) => {
  // expects title, post_content
  Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//Update a Post
router.put('/:id', withAuth, (req, res) => {
  Post.update(req.body,
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//Delete a Post
router.delete('/:id', withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;