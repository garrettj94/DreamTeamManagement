const router = require('express').Router();
const { Employee } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const employeesData = await Employee.findAll();
        res.status(200).json(employeesData)
    } catch (err) {
        res.status(400).json(err)
    }
})
router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const newEmployee = await Employee.create(req.body);

        res.status(200).json(newEmployee);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:employees_id', (req, res) => {
    Employee.update(
        {
            employee_name: req.body.employee_name,
            role: req.body.role,
            description: req.body.description,
            department_id: req.body.department_id
        },
        {
            where: {
                employees_id: req.params.employees_id
            },
        }
    )
    .then((updatedEmployees) => {
        req.json(updatedEmployees);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    });
});

router.delete('/:id', async (req, res) => {
    try {
        const employeeData = await Employee.destroy({
            where: {
                id: req.params.id,
            },
        });

        if(!employeeData) {
            res.status(404).json({ message: 'No employee found with that id. '});
            return;
        }

        res.status(200).json(employeeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;