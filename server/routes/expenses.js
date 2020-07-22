const models = require('../models');
const express = require('express');
const router = express.Router();


router.post('/user/:userId/create', async function(req, res, next) {
    
    const { title, category ,description } = req.body;
    if (parseInt(req.params.userId) === req.user.id) {
        try {
            let expense = await models.Expense.create({
                userId: req.user.id,
                category,
                description,
                title
            });
            return res.send("Expense Added");
        } catch (err) {
            return res.status(500).send(err.message);
        }

    }
    res.status(401).send('Unauthorized Request');
    // console.log(req.params);
    // console.log(req.user);
});


router.get('/user/:userId', async function(req, res, next) {
    if (parseInt(req.params.userId) === req.user.id) {
        const expenses = await models.Expense.findAll({
            where: {
                userId: req.user.id
            }
        });
        return res.json(expenses);
    }
    res.status(401).send('Unauthorized Request');
});

module.exports = router;
