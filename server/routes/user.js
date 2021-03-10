const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET_KEY } = require("../config");
const User = require("../models/user");

const getUserInfo = async (req, res, next) => {
  const userId = req.headers["x-token"];
  // console.log(userId);
  // console.log(1);
  if (!userId) {
    return res.status(401).json({ message: "Not authentication" });
  }
  let decoded;
  try {
    decoded = jwt.verify(userId, TOKEN_SECRET_KEY);
  } catch (e) {
    return res.status(401).json({ message: "Not authentication" });
  }
  try {
    const user = await User.findById(decoded.userId);
    if (user) {
      req.user = user;
      return next();
    }
    return res.status(401).json({ message: "Not authentication" });
  } catch (e) {
    res.status(400).json({ error: "Co loi xay ra vui long thu lai" });
  }
};

router.post("/", getUserInfo, (req, res) => {
  return res.json({ user: req.user });
});

module.exports = router;
