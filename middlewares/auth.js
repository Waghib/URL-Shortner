const { getUser} = require('../service/auth');

// Middleware to restrict access to logged in users only through cookies
async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;
    if (!userUid) {
        return res.redirect('/login');
    }
    const user = getUser(userUid);

    if (!user) {
        return res.redirect('/login');
    }

    req.user = user;
    next();
};

// Middleware to check if user is logged in
async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;

    const user = getUser(userUid);

    req.user = user;
    next();
};

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
};