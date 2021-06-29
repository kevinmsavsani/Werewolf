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
import { Provider } from 'react-redux';
import { store } from './store/configure-store';
import Component  from './store/component';
import "./style.css";

export default function App() {
  return (
    <Provider store={store}>
      <div className="body">
        <Router>
            <Switch>
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