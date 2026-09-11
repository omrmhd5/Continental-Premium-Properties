const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const { t } = require("../lib/i18n");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: t(req, "errors.invalidCredentials") });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: t(req, "errors.invalidCredentials") });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWTSECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: t(req, "success.login"),
      token,
    });
  } catch (error) {
    return res.status(400).json({ message: t(req, "errors.server") });
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ user: { id: user._id, username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: t(req, "errors.server") });
  }
};

module.exports = { login, register };
