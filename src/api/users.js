import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validateRegisterInput from "../validation/register";
import validateLoginInput from "../validation/login";
import Users from "../models/User";
import auth from '../middleware/auth'

const saltRounds = 10
// generate a salt randomly and add as a key in db 

const router = express.Router();

router.post("/register", async (req, res) => {
  try {

    const hashed = await bcrypt.hash(req.body.password, saltRounds)

    // add if user already exists

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
                accessToken,
                payload
              })
      
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

router.get("/profile", auth, async (req, res) => {
  const user = await Users.findById(req.user.id).select('-password')
  res.json(user)

})

module.exports = router;
