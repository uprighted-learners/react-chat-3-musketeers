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

router.get("/", async (req, res) => {
    try {
        const findAllRooms = await Room.find({})
        if (findAllRooms.length === 0) throw Error("No rooms found")
        res.status(200).json(findAllRooms)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

module.exports = router
