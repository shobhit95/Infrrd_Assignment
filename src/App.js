import React from "react";
import "./App.css";
import Schedule from "./Components/scheduleMeeting";
import ShowSchedule from "./Components/showSchedule";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <center>
        <h1>Employee Management</h1>
      </center>
      <Router>
        <Switch>
          <Route exact path="/" component={Schedule}></Route>
          <Route
            exact
            path="/showmeetings"
            component={props => <ShowSchedule {...props} />}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
