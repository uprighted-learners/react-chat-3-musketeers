//? Import dependencies and models:
const express = require("express")
const router = express.Router()
const Message = require("../models/Message")


router.post("/create", async (req, res) => {
    try {
        const { roomId: _id } = req.params  // Estrapolation of the id out of the params
        const currentRoom = await Room.findOne({ _id });

        if (!currentRoom) {
            res.status(404).json({
                message: `Room not found`
            })
        }

        const newMessage = {
            when: req.body.when,
            user: req.body.user,
            room: _id,
            body: req.body.body
        }

        room.message.push(newMessage)
        await room.save()

        res.status(201).json({
            message: "Message created successfully",
            newMessage
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: `${err}`
        })
    }
})


//  GET ALL THE MESSAGES IN  ROOM
router.get("/all", async (req, res) => {

    try {
        const { roomId: _id } = req.params
        const currentRoom = await Room.findOne({ _id });

        if (!currentRoom) {
            return res.status(404).json({
                message: "Room not found",
            });
        }

        const messages = currentRoom.messages;
        res.status(200).json({
            message: "Messages retrieved successfully",
            messages
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: `${err}`
        });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const { id: _id } = req.params
        const newMessage = req.body

        const updatedOne = await Message.updateOne(_id, { $set: newMessage })
        if (updatedOne.matchedCount === 0) throw Error("ID not found")

        res.status(200).json({
            message: `Entry updated`,
            updatedOne
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id: _id } = req.params

        const deleteOne = await Message.findByIdAndDelete(_id)

        if (!deleteOne) throw Error("ID not found")

        res.status(200).json({
            message: `Message deleted`,
            deleteOne
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})


module.exports = router