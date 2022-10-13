const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

const PORT = process.env.PORT || 3001

// middleware
const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("public"))

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