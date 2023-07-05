require("dotenv").config()
const express = require("express")
const app = express()

PORT = process.env.PORT || 4000
HOST = process.env.HOST || "127.0.0.1"

const messageController = require("./controllers/message")
const roomsController = require("./controllers/rooms")
const userController = require("./controllers/user")


const { dbConnect } = require("./db")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/:roomId/messages", messageController)
app.use("/rooms", roomsController)
app.use("/user", userController)

app.listen(PORT, HOST, () => {
    dbConnect()
    console.log(`[server] listening on ${HOST}:${PORT}`)
})
