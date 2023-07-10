require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()

const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || "127.0.0.1"

const messageController = require("./controllers/message")
const roomsController = require("./controllers/rooms")
const userController = require("./controllers/user")

const { dbConnect } = require("./db")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Enable CORS for all routes
app.use(cors())

app.use("/messages", messageController)
app.use("/rooms", roomsController)
app.use("/user", userController)

app.listen(PORT, HOST, () => {
    dbConnect()
    console.log(`[server] listening on ${HOST}:${PORT}`)
})
