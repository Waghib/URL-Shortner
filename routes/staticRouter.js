const express = require('express');
const URL = require('../models/url');

const router = express.Router();

// Home page
router.get('/', async (req, res) => {
    const allUrls = await URL.find({createdBy: req.user._id});
    return res.render('home', {urls: allUrls});
});

// Signup page
router.get('/signup', (req, res) => {
    return res.render('signup');
});

// Login page
router.get('/login', (req, res) => {
    return res.render('login');
});

module.exports = router;