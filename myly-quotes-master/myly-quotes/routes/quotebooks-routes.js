


const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Quotebook = require('../models/Quotebook');
const ensureLogin = require("connect-ensure-login");


router.get("/new-quotebook", ensureLogin.ensureLoggedIn('/user/login'), (req, res) => { 
  res.render("users/newQuotebook", { user: req.user });
});

router.post('/new-quotebook', (req, res, next)=>{
  
    Quotebook.create(req.body)
    .then((theNewQuotebook)=>{
      User.findById(req.user.id)
      .then((theUser)=>{
        theUser.quotebooks.push(theNewQuotebook)
        theUser.save();
      })
      .catch((err)=>{
        next(err)
      })
      res.redirect('/user/all-my-quotes');
    })
    .catch((err)=>{
      next(err)
    })
});

router.get("/all-my-quotes", ensureLogin.ensureLoggedIn('/user/login'), (req, res) => {
  User.findById(req.user._id).populate('quotebooks')
  .then((theUser)=>{
    res.render("users/allMyQuotes", {quotes: theUser.quotebooks});
  })
  .catch((err)=>{
    next(err)

  }) 
});

module.exports = router;
