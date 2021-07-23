// Core react imports
import React, { useEffect } from "react";
// Routing imports
import { useHistory } from "react-router-dom";
// Redux imports
import { useSelector } from "react-redux";
// Exporting default page component
export default function DashBoard() {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.authenticated) {
      history.push("/");
    }
  }, [user.authenticated, history]);
    return (
      <p>This is the dashboard</p>
  );
}
