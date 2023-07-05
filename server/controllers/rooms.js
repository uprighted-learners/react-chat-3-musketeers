//? Import dependencies and models:
const express = require("express")
const router = express.Router()
const Room = require("../models/Room")

router.post("/create", async (req, res) => {
    try {
        const { name, description, addedUsers } = req.body
        const newRoom = new Room(req.body)
        const saver = await newRoom.save()
        res.status(201).json({
            message: `Room created`,
            newRoom,
        })
    } catch (err) {
        res.status(500).json({
            message: `${err}`,
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
            message: `${err}`,
        })
    }
})

router.put("/:roomId", async (req, res) => {
    try {
        const { roomId } = req.params
        const { name, description, addedUsers } = req.body

        // Find the room by its ID
        const room = await Room.findById(roomId)
        if (!room) {
            return res.status(404).json({ error: "Room not found" })
        }

        // Update the room fields
        room.name = name
        room.description = description
        room.addedUsers = addedUsers

        // Save the updated room
        const updatedRoom = await room.save()

        return res.json({
            message: "Room updated successfully",
            room: updatedRoom,
        })
    } catch (err) {
        res.status(500).json({ message: `${err}` })
    }
})

router.delete("/:roomId", async (req, res) => {
    try {
        const { roomId } = req.params

        // Find the room by its ID and delete it
        const deletedRoom = await Room.findByIdAndDelete(roomId)
        if (!deletedRoom) {
            return res.status(404).json({ error: "Room not found" })
        }

        return res.json({ message: "Room deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: `${err}` })
    }
})

module.exports = router
