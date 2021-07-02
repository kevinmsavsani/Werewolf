import React, { useState } from 'react';
import "./style.css";

function JoinGame() {
    const [room, setRoom] = useState("");

    const handleChange =(event) =>  {
        setRoom(event.target.value.toUpperCase());
    }

    const url = `rooms/${room}`

    return (
        <div className="join">
            <h1>Join a game</h1>
            <div id="content">
                <p>Ask your host for the 4-letter game code.</p>
            </div>
            <input type="text" value={room} onChange={handleChange} />
            <a className="btn btn-primary" href="new">Back</a>
            <a className="btn btn-primary" href={url}>Join</a>
        </div>
    );
}

export default JoinGame