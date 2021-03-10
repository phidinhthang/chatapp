const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET_KEY } = require("../config");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res.status(400).json({
      error: "Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại.",
    });
  }
  try {
    const passwordValid = await bcrypt.compare(password, userExist.password);
    if (!passwordValid) {
      return res.status(400).json({
        error: "Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại.",
      });
    }
  } catch (e) {
    return res
      .status(400)
      .json({ error: "Có lỗi xảy ra, vui lòng thử lại sau" });
  }
  const token = jwt.sign({ userId: userExist._id }, TOKEN_SECRET_KEY, {
    expiresIn: "3d",
  });
  return res.status(200).json({ token });
});

module.exports = router;
