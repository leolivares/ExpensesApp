var models = require('../models')
var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  console.log(req.user);
  const users = await models.User.findAll({
    attributes: ['id', 'first_name', 'last_name', 'email']
  });
  res.send(JSON.stringify(users));
});

router.post('/auth', async function(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  if (email && password) {
    let user = await models.User.findOne({ where: { email } });
    if (user) {
      console.log(`User found: ${user.email}`);
      let result = await bcrypt.compare(password, user.password);
      if (result) {
        console.log(`Correct password for: ${user.email}`);
        let token = jwt.sign({ email }, process.env.TOKEN_SECRET)
        res.json(token);
      } else {
        res.send("Invalid password")
      }
    }
  } else {
    res.send("Enter username and password");
  }
});

router.post('/create', async function(req, res, next) {
  console.log(req.body);
  const { username, password, email } = req.body;
  let hash = await bcrypt.hash(password, 10);
  const user = await models.User.create({
    username,
    password: hash,
    email
  })
  res.send(`Create User ${username} ${password} ${email}`);
});

module.exports = router;
