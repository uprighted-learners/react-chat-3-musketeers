import React, { useState } from "react"
import Auth from "./components/Auth/Auth"
<<<<<<< HEAD
import AllRooms from "./components/AllRooms"
import RoomMessages from "./components/RoomMessages"
=======
import AllRooms from "./components/AllRooms/AllRooms"
import RoomMessages from "./components/RoomMessages/RoomMessages"
>>>>>>> e0a48ba5fdd1078ed42b103e4d62a4ab8ab9e181
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
