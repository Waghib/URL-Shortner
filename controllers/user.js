const User = require("../models/user");
const {v4: uuidv4} = require('uuid')
const {setUser} = require('../service/auth')

// function to handle user signup
async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });

  return res.redirect("/");
}

// function to handle user login
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", { error: "Invalid email or password" });
  }

  // set the user in the cookie
  const token = setUser(user);
  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
