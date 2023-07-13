import React, { useState, useEffect } from "react"
import "./RoomMessages.css"
import { AiOutlineTeam, AiOutlineSend } from "react-icons/ai"
import Message from "../Message/Message"

function RoomMessages({ room }) {
    const [messages, setMessages] = useState([])

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
            const { messages } = data // Access the messages array correctly

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
                        key={message._id} // Assign a unique key prop based on _id
                        body={message.body}
                        user={message.user}
                        timestamp={message.when}
                    />
                ))}
            </div>

            <div className="input-field">
                <form>
                    <input placeholder={`Message text`} />
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
