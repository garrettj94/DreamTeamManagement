const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

  app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

const PORT = process.env.PORT || 3001

// middleware
const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("public"))
app.use(passport.initialize());

//routes

app.get('/', (req, res) => {
    
    const dataFromDatabase = [
        {
            post_text: 'I am hungry',
            post_user: 'Ralph'
        },
        {
            post_text: 'I am TIRED',
            post_user: 'Bob'
        },
        {
            post_text: 'I am happy',
            post_user: 'Claire'
        },
        {
            post_text: 'I am happy',
            post_user: 'Claire'
        },
    ]
    
    
    res.render("profile.handlebars", {
        logged_in :true,
        posts: dataFromDatabase
    })
})

//run server
app.listen(PORT, (err) => {
    if(err) throw err;
    console.log('I am alive')
})