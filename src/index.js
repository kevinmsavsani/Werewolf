import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import JoinGame from './components/JoinGame';
import RoomStart from './components/RoomStart';
import { Provider } from 'react-redux';
import { store } from './store/configure-store';
import Component  from './store/component';
import "./style.css";
import NewGame from './components/NewGame';

export default function App() {
  return (
    <Provider store={store}>
      <div className="body">
        <Router>
            <Switch>
            <Route path="/rooms/:id" component={RoomStart} />
            <Route path="/new" component={NewGame} />
            <Route path="/join" component={JoinGame} />
              <Route path="/" component={Home} />
            </Switch>
        </Router>
      </div>
    </Provider>
    
  );

}

ReactDOM.render(<App />, document.getElementById("root"));