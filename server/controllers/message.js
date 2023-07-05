//? Import dependencies and models:
const express = require("express")
const router = express.Router()
const Message = require("../models/Message")
const Room = require("../models/Room")

router.post("/create", async (req, res) => {
    const { user, room, body } = req.body

    try {
        // Find the room by its name
        const foundRoom = await Room.findOne({ name: room })
        if (!foundRoom) {
            return res.status(404).json({ error: "Room not found" })
        }

        // Create a message in the found room
        const newMessage = new Message({
            user: user,
            room: foundRoom.name,
            body: body,
        })
        await newMessage.save()

        return res.json({
            message: "Message created successfully",
            messageId: newMessage._id,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "An error occurred" })
    }
})

//  GET ALL THE MESSAGES IN ROOM
router.get("/:roomName", async (req, res) => {
    const { roomName } = req.params

    try {
        // Find the room by its name
        const room = await Room.findOne({ name: roomName })
        if (!room) {
            return res.status(404).json({ error: "Room not found" })
        }

        // Find all messages in the room
        const messages = await Message.find({ room: room.name })

        return res.json({ messages: messages })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "An error occurred" })
    }
})

router.put("/:messageId", async (req, res) => {
    const { messageId } = req.params
    const { body } = req.body

    try {
        // Find the message by its ID
        const message = await Message.findById(messageId)
        if (!message) {
            return res.status(404).json({ error: "Message not found" })
        }

        // Update the message body
        message.body = body
        await message.save()

        return res.json({ message: "Message updated successfully" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "An error occurred" })
    }
})

router.delete("/:messageId", async (req, res) => {
    const { messageId } = req.params

    try {
        // Find the message by its ID and delete it
        const deletedMessage = await Message.findByIdAndDelete(messageId)
        if (!deletedMessage) {
            return res.status(404).json({ error: "Message not found" })
        }

        return res.json({ message: "Message deleted successfully" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "An error occurred" })
    }
})

module.exports = router
