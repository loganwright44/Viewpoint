const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
        username: username,
        password: hash
    });
    res.json('SUCCESS');
  });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) { return res.json('User Not Found'); };
  
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) { return res.json('Incorrect Password'); };
    
    const accessToken = sign(
        { username: user.username, id: user.id },
        'randomsecreto1i2349f8n9nqe98rncnane8v98ae898nvounqoiu3bro8cb'
    );
    
    return res.json(accessToken);
  });
});

module.exports = router;
