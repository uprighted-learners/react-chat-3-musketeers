const express = require("express")
const router = express.Router()
const Room = require("../models/room");


router.post("/create", async (req, res) => {
    try {
        const { name, description, addedUsers } = req.body
        const newRoom = new Room(req.body)
        const saver = await newRoom.save()
        res.status(201).json({
            message: `Room created`,
            newRoom
        })
    } catch (err) {
        res.status(500).json({
            message: `${err}`
        })
    }
})


module.exports = router
