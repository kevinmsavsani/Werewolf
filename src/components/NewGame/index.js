import React, {useEffect, useState} from 'react';
import io from "socket.io-client";

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

const socket = io("http://localhost:8000", {
  transports: ["websocket", "polling"]
});

function NewGame(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const roomId = makeid(4)
    const url = `/rooms/${roomId}`
    const username = prompt("what is your username");
    socket.on("connect", () => {
      socket.emit("username", {username,roomId});
    });

    socket.on("users", users => {
      setUsers(users);
    });

    socket.on("connected", user => {
      setUsers(users => [...users, user]);
    });

    socket.on("disconnected", id => {
      setUsers(users => {
        return users.filter(user => user.id !== id);
      });
    });
    window.location.href = url; 
  }, []);

  return (
    <div>
      <h1>New Game</h1>
    </div>
  );
};

export default NewGame;
