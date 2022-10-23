const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const routes = require('./controllers')
const path = require('path')
const sequelize = require('./config/connection');


const PORT = process.env.PORT || 3001

// middleware
const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))
app.use(passport.initialize());
app.use(passport.authenticate('session'));
app.use(cookieParser());
app.use(session({
    secret: 'secret secret secret',
    resave: false,
    saveUninitialized: false,
}));
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
    
    

    res.render("login", {


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