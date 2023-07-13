import React, { useState, useEffect } from "react"
import "./RoomMessages.css"
import { AiOutlineTeam, AiOutlineSend } from "react-icons/ai"
import Message from "../Message/Message"

function RoomMessages({ room }) {
    const [messages, setMessages] = useState([
        { _id: 1, body: "Hello!", user: "User 1", when: "2023-07-13 10:00 AM" },
        {
            _id: 2,
            body: "Hi there!",
            user: "User 2",
            when: "2023-07-13 11:30 AM",
        },
        {
            _id: 3,
            body: "Greetings!",
            user: "User 3",
            when: "2023-07-13 2:45 PM",
        },
    ])

    const fetchMessages = async () => {
        // const url = `http://localhost:4000/messages/${room.name}`
        // fetch(url, {
        //     method: "GET",
        //     headers: new Headers({
        //         "Content-Type": "application/json",
        //     }),
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         if (Array.isArray(data)) {
        //             setMessages(data)
        //         } else if (typeof data === "object") {
        //             const dataArray = Object.values(data)
        //             setMessages(dataArray)
        //         } else {
        //             console.error(
        //                 "Received data is not an array or object:",
        //                 data
        //             )
        //         }
        //     })
        //     .catch((err) => console.log(err))
        // Commented out the actual data fetching logic and used static data for testing
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
                        key={message._id}
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
