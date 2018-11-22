


const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/signup', (req, res, next)=>{
  res.render('users/signup', {message: req.flash('error')});
});

router.post('/signup', (req, res, next)=>{
  User.findOne({username: req.body.username})
  .then((user)=>{
    if(user != null){
      req.flash('error', 'This username is taken. Please chose another one.')
      res.redirect('/user/signup'); 
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    User.create(req.body)
    .then(()=>{
      res.redirect('/');
    })
    .catch((err)=>{
      next(err)
    })
  })
  .catch((err)=>{
    next(err);
  })
});

router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/');
});

module.exports = router;


