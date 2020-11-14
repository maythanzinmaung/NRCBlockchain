import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { Verify, DataEntry } from "./components";
import Login from "./Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.currentPathname = null;
  }

  componentDidMount() {
    const { history } = this.props;

    history.listen((newLocation, action) => {
      if (action === "PUSH") {
        if (newLocation.pathname !== this.currentPathname) {
          // Save new location
          this.currentPathname = newLocation.pathname;

          // Clone location object and push it to history
          history.push({
            pathname: newLocation.pathname,
          });
        }
      } else {
        // Send user back if they try to navigate back
        history.go(1);
      }
    });
  }

  render() {
    return (
      <div>
        <Router>
          {/* <Navigation /> */}
          <Switch>
            <Route path="/" exact component={() => <Login />} />
            <Route path="/DataEntry" exact component={() => <DataEntry />} />
            <Route path="/Verify" exact component={() => <Verify />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);
