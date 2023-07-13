import React, { useState } from "react"
import Auth from "./components/Auth/Auth"
import AllRooms from "./components/AllRooms/AllRooms"
import RoomMessages from "./components/RoomMessages/RoomMessages"
import "./App.css"

function App() {
    const [token, setToken] = useState(localStorage.getItem("token") || "")
    const [selectedRoom, setSelectedRoom] = useState(null)  //added now

    const handleRoomSelection = (room) => {
        setSelectedRoom(room)
    } //added now

    const handleLogout = () => {
        setToken("")
        localStorage.removeItem("token")
    }

    return (
        <div>
            {token ? (
                <div className="app-container">
                    <div className="first-section">
                        <AllRooms onSelectRoom={handleRoomSelection} />
                        <button onClick={handleLogout}>Logout</button>
                    </div>

                    <div className="second-section"> 
                        {selectedRoom && <RoomMessages room={selectedRoom} />}  
                    </div>
                </div>
            ) : (
                <Auth setToken={setToken} />
            )}
        </div>
    )
}

export default App
