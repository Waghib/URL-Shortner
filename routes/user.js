const express = require('express');
const router = express.Router();
const {handleUserSignup, handleUserLogin} = require('../controllers/user');

// Signup route
router.post('/', handleUserSignup);
// Login route
router.post('/login', handleUserLogin);


module.exports = router;