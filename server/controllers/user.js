//? Import dependencies and models:
const express = require("express")
const router = express.Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const SALT = Number(process.env.SALT)
const JWT_KEY = process.env.JWT_KEY // Retrieving the JWT secret key from environment variables

router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        if (!firstName || !lastName || !email || !password)
            throw Error("Incorrect schema values")

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, SALT), // hashSync is a method that generates a hash for the given string
        })

        await newUser.save() // method used to save data in the database

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

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        let foundUser = await User.findOne({ email })

        if (!foundUser) throw Error("User not found")

        // Compare password from req.body with password stored in the database
        const verifyPwd = await bcrypt.compare(password, foundUser.password)

        if (!verifyPwd) throw Error("Incorrect password")

        const token = jwt.sign({ _id: foundUser._id }, JWT_KEY, {
            expiresIn: 60 * 60 * 24,
        })

        res.status(200).json({
            message: `Logged in`,
            foundUser,
            token,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`,
        })
    }
})

router.put("/update/:id", async (req, res) => {
    try {
        const userId = req.params.id
        const { firstName, lastName, email, password } = req.body

        if (!firstName || !lastName || !email || !password) {
            throw Error("Incorrect schema values")
        }

        // Find the user by ID
        const user = await User.findById(userId)

        if (!user) {
            throw Error("User not found")
        }

        // Update the user fields
        user.firstName = firstName
        user.lastName = lastName
        user.email = email
        user.password = bcrypt.hashSync(password, SALT)

        // Save the updated user
        await user.save()

        res.status(200).json({
            message: "User updated",
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: `${error}`,
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id: _id } = req.params

        const deleteOne = await User.findByIdAndDelete(_id)

        if (!deleteOne) throw Error("ID not found")

        res.status(200).json({
            message: `User deleted`,
            deleteOne,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`,
        })
    }
})

module.exports = router
