import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validateRegisterInput from '../validation/register'
import validateLoginInput from '../validation/login'
import users from '../models/User'


const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        const newUser = new users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
     
        })
        await newUser.save()
        res.send(newUser)
    }
    catch(err) {
        console.log(err)
    }
  
});

module.exports = router