const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.checkPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

const express = require('express');

const router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;