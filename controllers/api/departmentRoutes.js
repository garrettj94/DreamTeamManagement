const router = require('express').Router();
const  { Department }  = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newDepartment = await Department.create({
            ...req.body,
            user_id: req.session.user_id,
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
        const departmentData = await department.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
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