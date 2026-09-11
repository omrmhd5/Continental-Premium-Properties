const jwt = require("jsonwebtoken");
const { t } = require("../lib/i18n");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: t(req, "errors.unauthorized") });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: t(req, "errors.invalidToken") });
  }
};

module.exports = { authenticateUser };
