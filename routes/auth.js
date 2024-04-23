const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerUser, loginUser } = require("../db/user.js");

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await registerUser(req.body.username, hashedPassword);
    const token = jwt.sign({ id: newUser.id }, process.env.JWT);
    res.status(201).send({ token });
  } catch (error) {
    console.error("error on auth/register route", error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body.username);
    if (user) {
      const matchedPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (matchedPassword) {
        const token = jwt.sign({ id: user.id }, process.env.JWT);
        res.status(200).send({ token });
      } else {
        res.send("incorrect credentials");
      }
    } else {
      res.send("user not found");
    }
  } catch (error) {
    console.error("error on auth/login route", error);
  }
});

module.exports = router;
