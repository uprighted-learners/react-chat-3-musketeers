import React from "react"
import "./Message.css"

function Message({ user, timestamp, body }) {
    return (
        <div className="single-message">
            <h4>
                {user}
                <span className="timestamp">{timestamp}</span>
            </h4>
            <p>{body}</p>
        </div>
    )
}

export default Message
