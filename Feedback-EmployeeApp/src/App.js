import "./App.css";
import { Container } from "@material-ui/core";
import Order from "./components/Order";
import ManagerPage from "./components/ManagerPage";
import React, { useState } from "react";
import Login from "./components/Login";
import StudentPage from "./components/StudentPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Logout from "./components/Logout";
import OrderForm from "./components/Order/OrderForm";

function App() {
  const [token, setToken] = useState();
  if (!token) {
    return (
      <Router>
        <Route
          path="/login"
          render={(props) => <Login setToken={setToken} {...props} />}
        />
      </Router>
    );
  } else {
    console.log(token);
    if (token.roleId === "0") {
      return (
        <Router>
          <Switch>
            <Route
              path="/login"
              render={(props) => <Login setToken={setToken} {...props} />}
            />
            <Route path="/manager">
              <ManagerPage></ManagerPage>
            </Route>
            <Route path="/logout" component={Logout} />
          </Switch>
        </Router>
      );
    }
    if (token.roleId === "1") {
      return (
        <Router>
          <Switch>
            <Route
              path="/login"
              render={(props) => <Login setToken={setToken} {...props} />}
            />
            <Route path="/employee">
              <OrderForm></OrderForm>
            </Route>
            <Route path="/logout" component={Logout} />
          </Switch>
        </Router>
      );
    }
    if (token.roleId === "2") {
      return (
        <Router>
          <Switch>
            <Route
              path="/login"
              render={(props) => <Login setToken={setToken} {...props} />}
            />
            <Route path="/student">
              <StudentPage></StudentPage>
            </Route>
            <Route path="/logout" component={Logout} />
          </Switch>
        </Router>
      );
    }
  }
}
export default App;
