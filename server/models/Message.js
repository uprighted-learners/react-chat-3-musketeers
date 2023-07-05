const mongoose = require("mongoose")

const Message = new mongoose.Schema(
    {
        when: {
            type: Date,
            required: true,
            default: Date.now,
        },
        user: {
            type: String,
            required: true,
        },
        room: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("message", Message)
