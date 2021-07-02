import "./style.css";
import React, {useEffect, useState} from 'react';
import io from "socket.io-client";
import { connect } from "react-redux";
import { addRoom, storeUser, updateUsers } from "../../store/actions/index";
import {useHistory} from 'react-router-dom';

const socket = io("http://localhost:8000", {
  transports: ["websocket", "polling"]
});

function JoinGame(props) {
    const history = useHistory();
    const [room, setRoom] = useState("");
    const [invalid,setInvalid] = useState(true);
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("request", ({}))
    });

    socket.on("connectedUsers", users => {
      props.updateUsers({users})
    });

    socket.on("users", users => {
      props.updateUsers({users})
    });

    socket.on("disconnected", ({id, users}) => {
      let newarray = Object.values(users).filter(function(value){ 
        return value.id  !== id;
    });
      props.updateUsers({users: newarray});
  });
  }, []);


      const handleChange =(event) =>  {
        setRoom(event.target.value.toUpperCase());
        const found = props.users.users.some(el => el.roomId === room);
        if(found) {
          console.log(false)
          setInvalid(false)
        } else {
          console.log(true)
          setInvalid(true)
        }
    }

    const showError =() =>  {
        const found = props.users.users.some(el => el.roomId === room);
        if (found || room.length != 4) {
            return ""
        }
        else {
            return `Room ${room} does not exist`
        }
    }

    const roomCheck = (event) => {
        console.log("tapped")
        event.preventDefault();
        const url = `/rooms/${room}`;
        // history.push(url);
        window.location.href = url; 
    }

    return (
        <div className="join">
            <h1>Join a game</h1>
            <div id="content">
                <p className="join-error">{showError()}</p>
                <p>Ask your host for the 4-letter game code.</p>
            </div>
            <input type="text" value={room} onChange={handleChange}  maxLength="4"/>
            <button className="btn-primary" onClick={() => {const url = `/`;history.push(url);}}>Back</button>
            <button className="btn-primary" onClick={roomCheck} disabled={!props.users.users.some(el => el.roomId === room)}>Join</button> 
        </div>
    );
}
const mapStateToProps = state => {
  return { rooms: state.rooms, user: state.user, users: state.users };
};

function mapDispatchToProps(dispatch) {
  return {
    addRoom: room => dispatch(addRoom(room)),
    storeUser: user => dispatch(storeUser(user)),
    updateUsers: users => dispatch(updateUsers(users))
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(JoinGame);