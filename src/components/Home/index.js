import React from 'react';
import "./style.css";

function Home() {
    return (
            <div className="home">
                <h1>Werewolf</h1>
                <hr />
                <h2>Gameplay</h2>
                <hr />
                <p>Each person is given a card, describing their role. </p>
                <p>During the night, players perform the action described by their role.</p>
                <p>During the day, players have a limited amount of time to discuss what happened at night, and what roles are assigned to which people.</p>
                <p>During the day phase, everybody casts a vote for who to kill. Once the day is over, votes are locked in.
                    The player(s) with the most votes die, unless everybody votes for a different person, in which case nobody dies.
                </p>
                <p>The Villager Team wins when at least one Werewolf <strong>dies</strong>, or if there are no Werewolves and <strong>nobody dies</strong>.
                </p>
                <p>The Werewolf Team wins when all Werewolves avoid death
                </p>
                <a className="btn btn-primary" href="new">New Game</a>
                <a className="btn btn-primary" href="join">Join Game</a>
        </div>
    );
}

export default Home