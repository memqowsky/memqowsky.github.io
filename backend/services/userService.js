const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

exports.authenticateUser = async (login, password) => {
  console.log("Secret: ",SECRET);
  console.log("Wyslane dane: ", login, password);
  const user = await User.findOne({ login });
  console.log("User z bazy danych:", user);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    console.log("user sie nie zgadza w userService");
    return null;
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '7d' });

  return {
    user,
    token,
    refreshToken
  };
};

exports.getUserFullNameById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return null;
  return `${user.firstName} ${user.lastName}`;
};
