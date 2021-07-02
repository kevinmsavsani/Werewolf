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
    const [error,setError] = useState("");
    const [boolError, setBoolError] = useState(true);
  useEffect(() => {
    const username = prompt("what is your username");
    socket.on("connect", () => {
      props.storeUser({user: username})
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
    props.addRoom({ roomId: props.match.params.id });
  }, []);


      const handleChange =(event) =>  {
        setRoom(event.target.value.toUpperCase());
        console.log(props.users)
        const found = props.users.users.some(el => el.roomId === room);
        if (found) setError("")
        else {
            setError(`Room ${room} does not exist`)
        }
    }

    const showError =() =>  {
        console.log(props.users)
        const found = props.users.users.some(el => el.roomId === room);
        if (found) {
            return ""
        }
        else {
            return `Room ${room} does not exist`
        }
    }

    const roomCheck = (event) => {
        console.log("tapped")
        event.preventDefault();
        socket.emit("username", {username: props.user.user.user,roomId: room});
        props.addRoom({ roomId: room });
        const url = `/rooms/${room}`;
        history.push(url);
    }

    return (
        <div className="join">
            <h1>Join a game</h1>
            <div id="content">
                <p className="join-error">{showError()}</p>
                <p>Ask your host for the 4-letter game code.</p>
            </div>
            <input type="text" value={room} onChange={handleChange} />
            <button className="btn-primary" onClick={() => {const url = `/`;history.push(url);}}>Back</button>
            <button className="btn-primary" onClick={roomCheck}>Join</button> 
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