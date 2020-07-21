const models = require('../models');
const express = require('express');
const router = express.Router();


router.get('/users/:userId', function(req, res, next) {
    console.log(req.params);
    res.send("Hola");
});

module.exports = router;
