const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const routes = require('./controllers')
const path = require('path')
const sequelize = require('./config/connection');



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

  //passport.use(new PassportLocal.Strategy({
  //  usernameField: 'email'
  //}, async (email, password, done) => {
    // try {
    //   const userData = await User.findAll({
    //     attributes: { exclude: ['password'] },
    //     order: [['name', 'ASC']],
    // });
    // }
    // catch(error) {
    //   done(error);
    // }

    // try {
    //   const userData = await User.findOne({ where: { email: req.body.email } });
  
    //   if (!userData) {
    //     res
    //       .status(400)
    //       .json({ message: 'Incorrect email or password, please try again' });
    //     return;
    //   }
  
    //   const validPassword = await userData.checkPassword(req.body.password);
  
    //   if (!validPassword) {
    //     res
    //       .status(400)
    //       .json({ message: 'Incorrect email or password, please try again' });
    //     return;
    //   }
  
    //   req.session.save(() => {
    //     req.session.user_id = userData.id;
    //     req.session.logged_in = true;
        
    //     res.json({ user: userData, message: 'You are now logged in!' });
    //   });
  
    // } catch (err) {
    //   done(err);
    // }
  //}));

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
app.use(express.static(path.join(__dirname,"public")))
app.use(passport.initialize());
app.use(routes);

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
    
    

=======
    res.render("homepage", {


        logged_in :true,
        posts: dataFromDatabase
    })
})

//run server
// app.listen(PORT, (err) => {
//     if(err) throw err;
//     console.log('I am alive')
// })
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
  });