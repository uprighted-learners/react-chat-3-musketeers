import React, { useState } from "react"
import "./Auth.css"

function Auth({ setToken }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, setLogin] = useState(true)
    const [error, setError] = useState("")

    const toggle = () => {
        setLogin((prevLogin) => !prevLogin)
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setError("")
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const url = login
            ? "http://localhost:4000/user/login"
            : "http://localhost:4000/user/register"

        const body = login
            ? { email, password }
            : { firstName, lastName, email, password }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.token) {
                    setToken(data.token)
                    localStorage.setItem("token", data.token)
                } else {
                    setError(data.message || "Authentication failed")
                }
            })
            .catch((error) => {
                setError("An error occurred")
                console.log(error)
            })
    }

    return (
        <div className="auth-wrapper">
            <form action="" className="form-wrapper">
                <h1 className="login-header">
                    {login ? "Welcome back!" : "Create an account!"}
                </h1>
                {!login && (
                    <>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                        />
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                        />
                    </>
                )}
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    id="pwd"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button onClick={handleSubmit}>
                    {login ? "Login" : "Register"}
                </button>
                {error && <div className="error">{error}</div>}
            </form>
            <a href="#" className="toggle-btn" onClick={toggle}>
                {login ? "Register" : "Login"}
            </a>
        </div>
    )
}

export default Auth
