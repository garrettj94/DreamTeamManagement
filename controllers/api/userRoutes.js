const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})

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

            // res.join({ user: userData, message: 'Logged in'})
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

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