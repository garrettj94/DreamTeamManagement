const router = require('express').Router();
const { User } = require('../../models');

// retrieve user data from api
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// add new user data to api
router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const userData = await User.create({
            email: req.body.signupEmail,
            password: req.body.signupPassword,
        });
        console.log(userData)
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

// post user data to login to app
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email }});

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again. '});
            return;
        }
        const correctPassword = await userData.checkPassword(req.body.password);

        if (!correctPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again. '});
            return;
        }


        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
            // res.join({ user: userData, message: 'Logged in'})
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// post user data to logout of app
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

// delete user data from api
router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id,
            },
        });

        if(!userData) {
            res.status(404).json({ message: 'No user found with that id. '});
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router