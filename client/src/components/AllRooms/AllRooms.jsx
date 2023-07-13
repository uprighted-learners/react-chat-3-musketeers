import React, { useEffect, useState } from "react"
import "./AllRooms.css"
import { TiPlus } from "react-icons/ti"
import { AiOutlineUser } from "react-icons/ai"

function AllRooms() {
    const [rooms, setRooms] = useState([])

    const fetchRooms = () => {
        const url = "http://localhost:4000/rooms/"

        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application.json",
            }),
        })
            .then((res) => res.json())
            .then((data) => setRooms(data))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchRooms()
    }, [])

    const renderRooms = () => {
        return (
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>Rooms</h2>
                    <TiPlus className="add-room" size="25px" />
                </div>
                <div></div>
                {rooms.map((r, i) => (
                    <div className="sidebar-rooms" key={i}>
                        <h2>
                            <span className="hash">#</span>
                            {r.name}
                        </h2>
                    </div>
                ))}

                <div className="sidebar-user">
                    <AiOutlineUser size="19px" color="grey" />
<<<<<<< HEAD:client/src/components/AllRooms.jsx
                    <div className="user-info">
                        <h3>Tiffania</h3>
                        <h3>Iside</h3>
=======
                    <div className='user-info'>
                        <h3>firstName</h3>
                        <h3>lastName</h3>
>>>>>>> e0a48ba5fdd1078ed42b103e4d62a4ab8ab9e181:client/src/components/AllRooms/AllRooms.jsx
                    </div>
                </div>
            </div>
        )
    }

    return <>{renderRooms()}</>
}

export default AllRooms
