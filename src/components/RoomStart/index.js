import "./style.css";
import React, {useEffect, useState} from 'react';
import io from "socket.io-client";
import { connect } from "react-redux";
import { addRoom } from "../../store/actions/index";

const socket = io("http://localhost:8000", {
  transports: ["websocket", "polling"]
});

function RoomStart(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const username = prompt("what is your username");
    socket.on("connect", () => {
      socket.emit("username", {username,roomId: props.match.params.id});
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
    console.log(props)
    props.addRoom({ roomId: props.match.params.id });
  }, []);

  const adjectives = ['Alert', 'Brave', 'Clean', 'Dark', 'Eager', 'Fast', 'Good', 'Huge', 'Itchy', 'Jolly', 'Kind', 'Large', 'Mean', 'Nice', 'Odd', 'Pink', 'Quick', 'Real', 'Shy', 'Tall', 'Ugly', 'Vigorous', 'Warm', 'Xenophobic', 'Young', 'Zesty'];
  const nouns = ['Ants', 'Bees', 'Cats', 'Dogs', 'Eagles', 'Fish', 'Goats', 'Hens', 'Insects', 'Jellyfish', 'Koalas', 'Lions', 'Mice', 'Newts', 'Otters', 'Pandas', 'Quails', 'Rabbits', 'Sloths', 'Turtles', 'Unicorns', 'Vultures', 'Wombats', 'Xylophones', 'Yaks', 'Zebras'];
  const verbs = ['Ache', 'Bite', 'Cheer', 'Dig', 'Eat', 'Fail', 'Give', 'Help', 'Itch', 'Jump', 'Knit', 'Lurk', 'Move', 'Nod', 'Order', 'Party', 'Quit', 'Read', 'Stop', 'Tease', 'Unite', 'Veer', 'Wish', 'X-Ray', 'Yell', 'Zoom'];
  const adverbs = ['Angrily', 'Busily', 'Calmly', 'Dryly', 'Easily', 'Fearlessly', 'Grimly', 'Happily', 'Illegally', 'Jokingly', 'Keenly', 'Lazily', 'Madly', 'Noisily', 'Openly', 'Politely', 'Quietly', 'Readily', 'Swiftly', 'Terribly', 'Usefully', 'Vaguely', 'Weakly', 'Xenophobically', 'Yearly', 'Zealously'];

  function silly_sentence(string) {
    console.log(props)
    var ordering;
    ordering = [adjectives, nouns, verbs, adverbs];
    return string.split('').map(function(letter, index) {
      return ordering[index][letter.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)];
    }).join(' ');
  };

    return (
        <div className="new">
            <h1>{props.match.params.id}</h1>
            <hr />
            <h3>{silly_sentence(props.match.params.id)}</h3>
            <hr />
            <div id="content">
                <h3>Players</h3>
                <ul>
                  {props.rooms.rooms.map(el => (
                    <li key={el.id}>{el.roomId}</li>
                  ))}
                </ul>
            </div>
        </div>
    );
}
const mapStateToProps = state => {
  return { rooms: state.rooms };
};

function mapDispatchToProps(dispatch) {
  return {
    addRoom: room => dispatch(addRoom(room))
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(RoomStart);