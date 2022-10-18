const router = require('express').Router();
const  { Department }  = require('../../models');

router.get('/', async (req, res) => {
    console.log("HIT ME BABY ONE MORE TIME")
    try {
        const departmentData = await Department.findAll();
        res.status(200).json(departmentData)
    } catch (err) {
        res.status(400).json(err)
    }
});

router.post('/', async (req, res) => {
    try {
        const newDepartment = await Department.create({
            ...req.body,
        });

        res.status(200).json(newDepartment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try{
        const departmentData = await Department.update({
            name: req.body.name,
            members: req.body.members,
        },
        {
            where: {
                department_id: req.params.department_id,
            },
        })
        res.status(200).json(departmentData);

    } catch (err) {
        res.status(400).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const departmentData = await Department.destroy({
            where: {
                id: req.params.id,
            },
        });

        if(!departmentData) {
            res.status(404).json({ message: 'No department found with this id. '});
            return;
        }

        res.status(200).json(departmentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;