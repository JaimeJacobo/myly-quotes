


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
    .then(()=>{
      res.redirect('/user/all-my-quotes');
    })
    .catch((err)=>{
      next(err)
    })
});



router.get("/all-my-quotes", ensureLogin.ensureLoggedIn('/user/login'), (req, res) => { 
  res.render("users/allMyQuotes", { user: req.user });
});

module.exports = router;
