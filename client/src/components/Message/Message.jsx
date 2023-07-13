import React from 'react'
import './Message.css'

function Message() {
    return (
        <div className='single-message'>
            <h4>User Name<span className='timestamp'>Time</span></h4>
            <p>Hello</p>
        </div>
    )
}

export default Message