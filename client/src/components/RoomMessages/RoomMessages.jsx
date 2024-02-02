import React, { useState, useEffect } from "react"
import "./RoomMessages.css"
import { AiOutlineTeam, AiOutlineSend } from "react-icons/ai"
import Message from "../Message/Message"

function RoomMessages({ room }) {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")

    const fetchMessages = async () => {
        const url = `http://localhost:4000/messages/${room.name}`

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to fetch messages")
            }

            const data = await response.json()
            const { messages } = data

            if (Array.isArray(messages)) {
                setMessages(messages)
            } else {
                console.error(
                    "Received data.messages is not an array:",
                    messages
                )
            }
        } catch (error) {
            console.error("Error fetching messages:", error)
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [room])

    const handleInputChange = (event) => {
        setNewMessage(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const newMessageObject = {
            user: "Collin",
            room: room.name,
            body: newMessage,
        }

        try {
            const response = await fetch(
                "http://localhost:4000/messages/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newMessageObject),
                }
            )

            if (!response.ok) {
                throw new Error("Failed to send message")
            }

            setNewMessage("")
            fetchMessages() // Fetch messages again after sending a new message
        } catch (error) {
            console.error("Error sending message:", error)
        }
    }

    return (
        <div className="container">
            <header>
                <div className="title">
                    <AiOutlineTeam
                        size="25px"
                        className="group-icon"
                        color="#537A5A"
                    />
                    <h2>Room Name</h2>
                </div>
                <h4>This is a room description</h4>
            </header>

            <div className="messages">
                {messages.map((message) => (
                    <Message
                        key={message._id}
                        body={message.body}
                        user={message.user}
                        timestamp={message.when}
                    />
                ))}
            </div>

            <div className="input-field">
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder={`Message text`}
                        value={newMessage}
                        onChange={handleInputChange}
                    />
                    <div className="input-send">
                        <button type="submit" className="send-button">
                            Send
                        </button>
                        <AiOutlineSend size="17px" color="#537A5A" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RoomMessages
