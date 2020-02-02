const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google'),
  (req, res) => {
    res.redirect('/')
  }


)

module.exports = router;
