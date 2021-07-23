// Core React imports
import React from "react";
// Router imports
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// Redux imports
import { useSelector } from "react-redux";
// Component Imports
import Auth from "./Pages/Auth/Index";
import DashBoard from "./Pages/DashBoard/Index";
import Conversations from "./Pages/Conversations/Index";
import Layout from "./Components/Layout";
// Exporting root app component
export default function App() {
  const user = useSelector((state) => state.user);

  return (
    <Router>
      {user.authenticated ? (
        <Layout>
          <Switch>
            <Route path="/conversations" component={Conversations} />
            <Route path="/" component={DashBoard} />
          </Switch>
        </Layout>
      ) : (
        <Switch>
          <Route path="/" component={Auth} />
        </Switch>
      )}
    </Router>
  );
}
