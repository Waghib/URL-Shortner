// jwt authnetication
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    }, secret);
}

function getUser(token) {
  if (!token) {
    console.error("Token is missing");
    return null;
  }
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
}

module.exports = {
  setUser,
  getUser
};