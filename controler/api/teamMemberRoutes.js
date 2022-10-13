const router = require('express').Router();
const { teamMembers } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newTeamMember = await teamMembers.create({
            ...req.body,
            team_id: req.session.team_id,
        });

        res.status(200).json(newTeamMember);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:teamMembers_id', (req, res) => {
    teamMembers.update(
        {
            name: req.body.name,
            role: req.body.role,
            description: req.body.description
        },
        {
            where: {
                teamMembers_id: req.params.teamMembers_id
            },
        }
    )
    .then((updatedTeamMember) => {
        req.json(updatedTeamMember);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    });
});

router.delete('/:id', async (req, res) => {
    try {
        const teamMemberData = await teamMembers.destroy({
            where: {
                id: req.params.id,
                team_id: req.session.user_id,
            },
        });

        if(!teamMemberData) {
            res.status(404).json({ message: 'No team member found with that id. '});
            return;
        }

        res.status(200).json(teamMemberData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;