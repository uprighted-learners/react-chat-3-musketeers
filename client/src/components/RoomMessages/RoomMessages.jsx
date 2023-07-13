import React, { useState, useEffect } from "react"
import "./RoomMessages.css"
import { AiOutlineTeam, AiOutlineSend } from "react-icons/ai"
import Message from "../Message/Message"

function RoomMessages() {
    const [messages, setMessages] = useState([])

    const fetchMessages = () => {
        const url = "http://localhost:4000/messages/Main"

        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setMessages(data)
                } else if (typeof data === "object") {
                    const dataArray = Object.values(data)
                    setMessages(dataArray)
                } else {
                    console.error(
                        "Received data is not an array or object:",
                        data
                    )
                }
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchMessages()
    }, [])

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
                        key={message._id} // Assign a unique key prop
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
