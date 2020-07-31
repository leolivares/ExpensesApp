const models = require('../models');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  console.log(req.user);
  const users = await models.User.findAll({
    attributes: ['id', 'first_name', 'last_name', 'email', 'birthday']
  });
  res.send(JSON.stringify(users));
});

router.post('/auth', async function(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  console.log(email, password);
  try {
    let user = await models.User.findOne({ where: { email } });
    let result = await bcrypt.compare(password, user.password);
    if (result) {
      let token = jwt.sign({ email, id: user.id }, process.env.TOKEN_SECRET)
      return res.json(token);
    }
    next(Error("Invalid Email/Password"));
  } catch(error) {
    next(Error("Invalid Email/Password"));
  }
});

router.post('/create', async function(req, res, next) {
  const { password, email, first_name, last_name, birthday } = req.body;
  try {
    let hash = await bcrypt.hash(password, 10);
    const user = await models.User.create({
      password: hash,
      email,
      first_name,
      last_name,
      birthday
    })
    res.send(`Create User ${email} ${password} ${first_name} ${last_name} ${birthday}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
