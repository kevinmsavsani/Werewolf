import "./style.css";
import React, {useEffect, useState} from 'react';
import io from "socket.io-client";
import { connect } from "react-redux";
import { addRoom, storeUser, updateUsers } from "../../store/actions/index";
import {useHistory} from 'react-router-dom';

const socket = io("http://localhost:8000", {
  transports: ["websocket", "polling"]
});

function RoomStart(props) {
  const history = useHistory();

  useEffect(() => {
    const username = prompt("what is your username");
    socket.on("connect", () => {
      socket.emit("username", {username,roomId: props.match.params.id});
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

  const adjectives = ['Alert', 'Brave', 'Clean', 'Dark', 'Eager', 'Fast', 'Good', 'Huge', 'Itchy', 'Jolly', 'Kind', 'Large', 'Mean', 'Nice', 'Odd', 'Pink', 'Quick', 'Real', 'Shy', 'Tall', 'Ugly', 'Vigorous', 'Warm', 'Xenophobic', 'Young', 'Zesty'];
  const nouns = ['Ants', 'Bees', 'Cats', 'Dogs', 'Eagles', 'Fish', 'Goats', 'Hens', 'Insects', 'Jellyfish', 'Koalas', 'Lions', 'Mice', 'Newts', 'Otters', 'Pandas', 'Quails', 'Rabbits', 'Sloths', 'Turtles', 'Unicorns', 'Vultures', 'Wombats', 'Xylophones', 'Yaks', 'Zebras'];
  const verbs = ['Ache', 'Bite', 'Cheer', 'Dig', 'Eat', 'Fail', 'Give', 'Help', 'Itch', 'Jump', 'Knit', 'Lurk', 'Move', 'Nod', 'Order', 'Party', 'Quit', 'Read', 'Stop', 'Tease', 'Unite', 'Veer', 'Wish', 'X-Ray', 'Yell', 'Zoom'];
  const adverbs = ['Angrily', 'Busily', 'Calmly', 'Dryly', 'Easily', 'Fearlessly', 'Grimly', 'Happily', 'Illegally', 'Jokingly', 'Keenly', 'Lazily', 'Madly', 'Noisily', 'Openly', 'Politely', 'Quietly', 'Readily', 'Swiftly', 'Terribly', 'Usefully', 'Vaguely', 'Weakly', 'Xenophobically', 'Yearly', 'Zealously'];

  function silly_sentence(string) {
    var ordering;
    ordering = [adjectives, nouns, verbs, adverbs];
    return string.split('').map(function(letter, index) {
      return ordering[index][letter.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)];
    }).join(' ');
  };


  const roomCheck = (event) => {
    event.preventDefault();
    // const url = `/rooms/${room}`;
    // history.push(url);
    // window.location.href = url; 
}

function startGameCheck(){
  const roomUsers = props.users.users.filter(user => user.roomId == props.match.params.id);
  console.log(roomUsers)
  return roomUsers.length > 3
}
    
    return (
        <div className="new">
            <h1>{props.match.params.id}</h1>
            <hr />
            <h3>{silly_sentence(props.match.params.id)}</h3>
            <hr />
            <div id="content">
                <h3>Players</h3>
                <ul>
                  {props.users.users.filter(user => user.roomId == props.match.params.id).map(el => (
                    <li key={el.id}>{el.name}</li>
                  ))}
                </ul>
                <button onClick={() => {const url = `/`;window.location.href = url;}}>Leave</button>
                <button onClick={roomCheck} disabled={!startGameCheck()}>Start Game</button> 
            </div>
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


export default connect(mapStateToProps,mapDispatchToProps)(RoomStart);