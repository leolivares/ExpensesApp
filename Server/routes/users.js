var models = require('../models')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await models.User.findAll({
    attributes: ['id', 'first_name', 'last_name', 'email']
  });
  res.send(JSON.stringify(users));
});

router.post('/create', async function(req, res, next) {
  console.log(req.body);
  const { username, password, email } = req.body;
  const user = await models.User.create({
    username,
    password,
    email
  })
  res.send(`Create User ${username} ${password} ${email}`);
});

module.exports = router;
