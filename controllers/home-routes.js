
const router = require('express').Router();
//import sequelize modules and models
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

//The Homepage
router.get('/', (req, res) => {
  console.log(req.session);
  Post.findAll({
    attributes: [
      'id',
      'post_content',
      'title',
      'created_at'
    ],
    include: [
      {
        //include the Comment model
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        //part that wil include User model within Comment model to show username of user who made the comment,
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      //map array and serialize data
      const posts = dbPostData.map(post => post.get({ plain: true }));
      //we take that array and add it to an object to pass into the template
      // console.log(posts);
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Login Page (we dont have any variables to plug into our login page so we dont need to pass in a second argument to res.render)
router.get('/login', (req, res) => {
  //if logged in already, redirect to homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//Signup Page
router.get('/signup', (req, res) => {
  res.render('signup');
})

//Get Single Post Page
router.get('/post/:id', (req, res) => {
  //findOne is like 'SELECT * FROM users WHERE id = ?'
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_content',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('single-post', {
        post,
        //pass a session variable into the template
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
