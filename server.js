// dependencies
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
//added this
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3001

// middleware
const hbs = exphbs.create({});
//create session
const sess = {
  secret: 'secret secret secret',
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db:sequelize
  })
};

//express dependencies
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))
app.use(session(sess));
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

app.use(passport.initialize());
app.use(passport.authenticate('session'));
app.use(cookieParser());
//added this
// moved app.use(session(sess));
// session({
//   secret: 'secret secret secret',
//   resave: false,
//   saveUninitialized: false,
// }));
app.use(routes);

//routes
app.get('/', (req, res) => {
        res.render("login", {


        logged_in :true,
    })
})


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
  });