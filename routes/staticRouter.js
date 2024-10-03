const express = require('express');
const URL = require('../models/url');
const { restrictTo } = require('../middlewares/auth');

const router = express.Router();

router.get('/admin/urls', restrictTo(["ADMIN"]), async (req, res) => {
    console.log("Admin user is accessing the URLS");
    const allUrls = await URL.find({});
    return res.render('home', {urls: allUrls});
});

// Home page
router.get('/', restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    const UserUrls = await URL.find({createdBy: req.user._id});
    return res.render('home', {urls: UserUrls});
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