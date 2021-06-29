import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import JoinGame from './components/JoinGame';
import NewGame from './components/NewGame';
import "./style.css";

export default function App() {
  return (
    <div class="body">
      <Router>
          <Switch>
          <Route path="/new" component={NewGame} />
          <Route path="/join" component={JoinGame} />
            <Route path="/" component={Home} />
          </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));