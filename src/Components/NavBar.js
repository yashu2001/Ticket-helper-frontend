// Core React imports
import React from "react";
// Ui lib imports
import { Box, makeStyles } from "@material-ui/core";
// Creating style hook
const useStyles = makeStyles((theme) => ({
  navBar: {
    backgroundColor: "#000000",
  },
  logo: {
    height: "100px",
  },
}));
// Exporting default functional component
export default function NavBar() {
  const classes = useStyles();
  return (
    <Box className={classes.navBar}>
      <img className={classes.logo} src="/logo.PNG" alt="logo" />
    </Box>
  );
}
