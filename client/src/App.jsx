import React, { useState } from "react"
import Auth from "./components/Auth"
import AllRooms from "./components/AllRooms"
import RoomMessages from "./components/RoomMessages"
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
                <div>
                    User is logged in
                    <button onClick={handleLogout}>Logout</button>
                    <AllRooms />

                    <RoomMessages />
                </div>
            ) : (
                <Auth setToken={setToken} />
            )}
        </div>
    )
}

export default App
