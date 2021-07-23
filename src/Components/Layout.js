// Core React Imports
import React from "react";
// Routing imports
import { Link, useLocation } from "react-router-dom";
// Ui lib imports
import { Grid, Box, makeStyles, Avatar } from "@material-ui/core";
// Icon imports
import DashboardIcon from "@material-ui/icons/Dashboard";
import ForumIcon from "@material-ui/icons/Forum";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
// Redux related imports
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/user/userStoreActions";
// creating stlye hooks
const useStyles = makeStyles((theme) => ({
  sideNav: {
    boxSizing: "border-box",
    backgroundColor: "black",
    height: "100vh",
    padding: "20px 0px",
  },
  sideNavIcon: {
    padding: "10px 0px",
    color: "white",
    "&:hover": {
      cursor: "pointer",
      color: "#CBB26A",
    },
  },
  activeNavItem: {
    color: "#CBB26A",
  },
}));
// Exporting default component
export default function Layout(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    window.FB.logout();
    dispatch(logout());
  };
  return (
    <Grid container>
      <Grid item xs={1}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          className={classes.sideNav}
        >
          <Box>
            <Box>
              <Link to="/">
                <DashboardIcon
                  className={
                    location.pathname === "/"
                      ? [classes.sideNavIcon, classes.activeNavItem]
                      : classes.sideNavIcon
                  }
                  fontSize="large"
                />
              </Link>
            </Box>
            <Box>
              <Link to="/conversations">
                <ForumIcon
                  className={
                    location.pathname === "/conversations"
                      ? [classes.sideNavIcon, classes.activeNavItem]
                      : classes.sideNavIcon
                  }
                  fontSize="large"
                />
              </Link>
            </Box>
          </Box>
          <Box>
            <Box>
              <PowerSettingsNewIcon
                className={classes.sideNavIcon}
                fontSize="large"
                onClick={handleLogout}
              />
            </Box>
            <Box>
              <Avatar alt={user.name} src={user.image} />
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={11}>
        {props.children}
      </Grid>
    </Grid>
  );
}
