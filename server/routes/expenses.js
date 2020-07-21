var models = require('../models');
var express = require('express');
var router = express.Router();


router.get('/users/:userId', function(req, res, next) {
    console.log(req.params);
    res.send("Hola");
});

module.exports = router;
