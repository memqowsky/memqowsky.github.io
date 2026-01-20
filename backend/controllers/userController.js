const userService = require('../services/userService');
const User = require('../models/userModel');


exports.login = async (req, res) => {

  console.log("Backend userController przyjmuje login");
  const { login, password } = req.body;

  try {
    const result = await userService.authenticateUser(login, password);
    if (!result) {
      return res.status(401).json({ message: 'Nieprawidłowy login lub hasło' });
    }

    res.json({
      user: {
        id: result.user._id,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        login: result.user.login,
        role: result.user.role
      },
      token: result.token,
      refreshToken: result.refreshToken
    });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

exports.login = async (req, res) => {
  const { login, password } = req.body;

  try {
    const result = await userService.authenticateUser(login, password);
    if (!result) {
      return res.status(401).json({ message: 'Nieprawidłowy login lub hasło' });
    }

    res.json({
      user: {
        id: result.user._id,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        login: result.user.login,
        role: result.user.role
      },
      token: result.token,
      refreshToken: result.refreshToken
    });
  } catch (error) {
    console.error("Błąd logowania:", error);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'Użytkownik nie znaleziony' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};


