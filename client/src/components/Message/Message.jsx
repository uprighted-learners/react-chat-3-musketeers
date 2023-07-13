import React from 'react'
import './Message.css'

function Message() {
    return (
        <div className='single-message'>
            <h4>Username<span className='timestamp'>Time</span></h4>
            <p>Text message</p>
        </div>
    )
}

export default Message