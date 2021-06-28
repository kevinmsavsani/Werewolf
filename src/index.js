import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Night from "./components/Night";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/night" component={Night} />
        </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));