import React from 'react'
import './RoomMessages.css'
import { AiOutlineTeam, AiOutlineSend } from 'react-icons/ai'
import Message from '../Message/Message'

function RoomMessages() {
  return (
    <div className='container'>
      <header>
        <div className='title'>
          <AiOutlineTeam size="25px" className='group-icon' color='#537A5A' />
          <h2>Room Name</h2>
        </div>
        <h4>Description</h4>
      </header>

      <div className='messages'>
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