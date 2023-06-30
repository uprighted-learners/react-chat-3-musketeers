const mongoose = require("mongoose")

const Message = new mongoose.Schema(
    {
        when: {
            type: Date,
            required: true,
        },
        user: {
            type: String,
            required: true,
        },
        room: {
            type: Number,
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
