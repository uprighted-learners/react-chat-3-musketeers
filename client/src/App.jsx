import React, { useState } from "react"
import Auth from "./components/Auth/Auth"
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
                </div>
            ) : (
                <Auth setToken={setToken} />
            )}
        </div>
    )
}

export default App
