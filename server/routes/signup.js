const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: "Email đã tồn tại" });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ error: "Có lỗi xảy ra, vui lòng thử lại sau" });
  }

  try {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return res.status(201).json({ message: "Dang ki thanh cong" });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ error: "Có lỗi xảy ra, vui lòng thử lại sau" });
  }
});

module.exports = router;
