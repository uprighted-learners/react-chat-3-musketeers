import React from "react"
import "./Message.css"

function Message({ user, timestamp, body }) {
    const formattedTimestamp = new Date(timestamp).toLocaleString()

    return (
        <div className="single-message">
            <h4>
                {user}
                <span className="timestamp">{formattedTimestamp}</span>
            </h4>
            <p>{body}</p>
        </div>
    )
}

export default Message
