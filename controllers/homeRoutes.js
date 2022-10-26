const router = require('express').Router();
const { User, Department, Employee } = require('../models');
const withAuth = require('./auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });

        const users = userData.map((user) => user.get({ plain: true }));

        res.render('homepage', {
            users,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return
    }

    res.render('login')
});

router.get('/homepage', async (req, res) => {
    try {
        const departmentData = await Department.findAll({})
        console.log(departmentData)

        const departments = await departmentData.map((department) => department.get({ plain: true }));
        console.log(departments)
        res.render('homepage', {departments, logged_in: req.session.logged_in})
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
});

router.get('/createddpt', async (req, res) => {
    try {

        const departmentData = await Department.findAll({})
        console.log(departmentData)

        const departments = await departmentData.map((department) => department.get({ plain: true }));
        console.log(departments);

        const employeeData = await Employee.findAll({})
        console.log(employeeData)

        const employees = await employeeData.map((employee) => employee.get({ plain: true }));
        console.log(employees)
        res.render('createddpt', {employees, departments,  logged_in: req.session.logged_in})
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

router.get('/newdepartment', (req, res) => {
    res.render('new')
})

router.get('/newemployee', (req, res) => {
    res.render('employee')
})




module.exports = router;