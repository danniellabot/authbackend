import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validateRegisterInput from "../validation/register";
import validateLoginInput from "../validation/login";
import Users from "../models/User";

const saltRounds = 10

const router = express.Router();

router.post("/register", async (req, res) => {
  try {

    const hashed = await bcrypt.hash(req.body.password, saltRounds)

    const newUser = new Users({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
    });

    await newUser.save();
    res.send(newUser);

  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
    try {
  
      const user = await Users.findOne({
          email: req.body.email
      })
      console.log(user)
      if (user) {
        const cmp = await bcrypt.compare(req.body.password, user.password);
        if (cmp) {
            const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
            }
            const accessToken = jwt.sign(payload, process.env.SECRET_OR_KEY)
            res.json({
                success: true,
                token: "Bearer " + accessToken
              })
          //   ..... further code to maintain authentication like jwt or sessions
          //res.send("Auth Successful");
        } else {
          res.send("Wrong username or password.");
        }
      } else {
        res.send("Wrong username or password.");
      }
  
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
