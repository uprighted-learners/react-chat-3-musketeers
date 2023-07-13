import React, { useState } from "react"
import Auth from "./components/Auth/Auth"
import AllRooms from "./components/AllRooms/AllRooms"
import RoomMessages from "./components/RoomMessages/RoomMessages"
import "./App.css"

function App() {
    const [token, setToken] = useState(localStorage.getItem("token") || "")

    const handleLogout = () => {
        setToken("")
        localStorage.removeItem("token")
    }


    return (
        <div>
            {token ? (
                <div className="app-container">
                    <div className="first-section">
                        <AllRooms />
                        <button onClick={handleLogout}>Logout</button>
                    </div>

                    <div className="second-section">
                        <RoomMessages />
                    </div>

                </div>
            ) : (
                <Auth setToken={setToken} />
            )}
        </div>
    )
}

export default App
