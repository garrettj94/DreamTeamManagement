const router = require('express').Router();
const { User, Department, Employee } = require('../models');
const withAuth = require('./auth');

// 
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

// render the login page, redirect the user if logged in successfully
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return
    }

    res.render('login')
});

// render the homepage and seralize department data
router.get('/homepage', async (req, res) => {
    try {
        const departmentData = await Department.findAll({})
        console.log(departmentData)

        const departments = await departmentData.map((department) => department.get({ plain: true }));
        console.log(departments)
        res.render('homepage', { departments, logged_in: req.session.logged_in })
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
});

// render individual department pages and serialize employee data
router.get('/createddpt/:id', async (req, res) => {
    try {

        const departmentData = await Department.findByPk(req.params.id);

        const department = departmentData.get({ plain: true });
        console.log(department);

        const employeeData = await Employee.findAll({
            where: {
                department_id : req.params.id
            }
        })
        console.log(employeeData)

        const employees = await employeeData.map((employee) => employee.get({ plain: true }));
        console.log(employees)
        res.render('createddpt', { employees, department, logged_in: req.session.logged_in })
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

// render page to create new department
router.get('/newdepartment', (req, res) => {
    res.render('new')
})

// render page to create new employee
router.get('/newemployee', (req, res) => {
    res.render('employee')
})




module.exports = router;