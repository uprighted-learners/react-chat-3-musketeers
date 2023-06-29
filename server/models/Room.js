const mongoose = require("mongoose")

const Room = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        addedUsers: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("room", Room)
