const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('./HTML/register', {
        title: 'register'
    });
})
// Create social media logins for the user. These will be the main forms of signing up for the user.
// Therefore, I will hide the sign-up page so that the user would need to click login and then sign in with their socials.
// router.post('/register', async (req, res) => {
//     console.log(req.body);
//     const { email, firstname, surname, username, password } = req.body;
//     const role = 'Reader';
//     const user = new User({email, firstname, surname, username, role});
//     const registeredUser = await User.register(user, password);
//     console.log(registeredUser);
//     res.redirect('/');
// })

router.get('/login', (req, res) => {
    res.render('./HTML/login', {
        title: 'Log in',
    });
})

router.post('/login', passport.authenticate('local', { failureFlash: false, failureRedirect: '/login' }), async (req, res) => {
    if (req.user.role === 'Author') {
        // here the user will add a picture for their author account
        if (!req.user.profilePicture) {
            res.redirect('/Author/New-Login');
        } else {
            res.redirect('/Author/Profile');
        }
    } else if (req.user.role === 'Admin') {
        console.log(req.user.role);
        console.log('got here.');
        res.redirect('/Admin');
    } else {
        res.redirect('/');
    }
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;