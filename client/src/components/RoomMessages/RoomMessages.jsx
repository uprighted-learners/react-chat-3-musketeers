import React, { useState, useEffect } from 'react'
import './RoomMessages.css'
import { AiOutlineTeam, AiOutlineSend } from 'react-icons/ai'
import Message from '../Message/Message'

function RoomMessages() {

  // const [messages, setMessages] = useState([])

  // const fetchMessages = () => {
  //   const url = 'http://localhost:4000/messages/Main'

  //   fetch(url, {
  //     method: "GET",
  //     headers: new Headers({
  //       "Content-Type": "application.json"
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(data => setMessages(data))
  //     .catch(err => console.log(err))
  // }


  // useEffect(() => {
  //   fetchMessages()
  // }, [])

  return (
    <div className='container'>
      <header>
        <div className='title'>
          <AiOutlineTeam size="25px" className='group-icon' color='#537A5A' />
          <h2>Room Name</h2>
        </div>
        <h4>This is a room description</h4>
      </header>

      <div className='messages'>
        {/* {messages.map(message => (
          <Message key={message._id} body={message.body} user={message.user} timestamp={message.when} />
        ))} */}
        <Message />
      </div>

      <div className='input-field'>
        <form>
          <input placeholder={`Message test`} />
          <div className='input-send'>
            <button type='submit' className='send-button'>Send</button>
            <AiOutlineSend size="17px" color='#537A5A' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default RoomMessages