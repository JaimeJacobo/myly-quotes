const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET all quotes page */
router.get('/all-quotes', (req, res, next) => {
  res.render('all-quotes');
});



module.exports = router;
