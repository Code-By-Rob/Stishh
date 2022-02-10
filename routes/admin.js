const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

router.post('/Create/Author', async (req, res) => {
    const { email, firstname, surname, username, password } = req.body;
    const role = 'Author';
    const user = new User({email, firstname, surname, username, role});
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    res.send({
        message: 'success',
    })
});

router.post('/Create/Admin', async (req, res) => {
    const { email, firstname, surname, username, password } = req.body;
    const role = 'Admin';
    const user = new User({email, firstname, surname, username, role});
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    res.send({
        message: 'success',
    })
});

module.exports = router;