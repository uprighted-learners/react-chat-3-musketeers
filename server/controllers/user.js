const express = require("express")
const router = express.Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const SALT = Number(process.env.SALT)
const JWT_KEY = process.env.JWT_KEY

router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        if (!firstName || !lastName || !email || !password)
            throw Error("Incorrect schema values")

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, SALT),
        })

        await newUser.save()

        // Generate new JWT token
        const token = jwt.sign({ _id: newUser._id }, JWT_KEY, {
            expiresIn: 60 * 60 * 24,
        })

        res.status(201).json({
            message: `User created`,
            newUser,
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: `${error}`,
        })
    }
})

module.exports = router
