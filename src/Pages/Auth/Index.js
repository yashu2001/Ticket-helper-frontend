// Core react imports
import React, { useState, useEffect } from "react";
// Router imports
import { useHistory } from "react-router-dom";
// Ui Lib imports
import { Grid, Box, makeStyles, Button, Snackbar } from "@material-ui/core";
// Icon imports
import FacebookIcon from "@material-ui/icons/Facebook";
// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { Authenticate, getUserData } from "../../redux/user/userStoreActions";
// Custom component imports
import NavBar from "../../Components/NavBar";
// Constructing style hooks
const useStyles = makeStyles((theme) => ({
  contentBox: {
    height: "100%",
    backgroundColor: "#F3F1F6",
    [theme.breakpoints.down("sm")]: {
      padding: "20px",
    },
  },
  header: {
    fontSize: "24px",
    textAlign: "left",
    fontWeight: "bold",
    margin: "4px 0px",
    lineHeight: "28px",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  greeting: {
    fontSize: "20px",
    textAlign: "left",
    fontWeight: "600",
    margin: "4px 0px",
    lineHeight: "24px",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  tagLine: {
    fontSize: "16px",
    textAlign: "left",
    fontWeight: "500",
    margin: "4px 0px",
    lineHeight: "20px",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  authBtn: {
    width: "30vw",
    [theme.breakpoints.down("md")]: {
      alignSelf: "center",
      width: "40vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
    },
  },
  footer: {
    backgroundColor: "#000",
  },
}));
const initiateAuthCheck = (dispatch) => {
  setTimeout(
    () =>
      window.FB.getLoginStatus((response) => {
        console.log(response);
        if (response.status === "connected") {
          dispatch(getUserData(response.authResponse.accessToken));
        }
      }),
    1000
  );
};
export default function Auth() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // State declarations
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const classes = useStyles();
  // Pre runs and effects
  const history = useHistory();
  useEffect(() => {
    initiateAuthCheck(dispatch);
  }, [dispatch]);
  useEffect(() => {
    if (user.authenticated) {
      setSnackMessage("Authentication success");
      setOpenSnack(true);
      history.push("/dashboard");
    }
  }, [user.authenticated, history]);
  // Handler methods
  const handleFbAuth = () => {
    window.FB.login(
      (response) => {
        if (response.status === "connected") {
          localStorage.setItem(
            "accessToken",
            response.authResponse.accessToken
          );
          window.FB.api("/me", { fields: "email,name,picture" }, (data) => {
            window.FB.api(
              `${response.authResponse.userID}/accounts/?access_token${response.authResponse.accessToken}`,
              (pageData) => {
                console.log(data, response, pageData);
                // Obtain all id's for the pages we are granted access to
                let pages = pageData.data.map((page) => ({
                  id: page.id,
                  name: page.name,
                }));
                // Install our app to all pages we are granted access to
                pageData.data.forEach((page) => {
                  window.FB.api(
                    `${page.id}/subscribed_apps?subscribed_fields=feed,messages&access_token=${page.access_token}`,
                    {},
                    "POST",
                    (subres) => {
                      console.log("subscription to app :", subres.success);
                    }
                  );
                });
                dispatch(Authenticate({ ...data, pages }));
              }
            );
          });
        } else {
          setSnackMessage("Authentication cancelled");
          setOpenSnack(true);
        }
      },
      {
        scope:
          "email,public_profile,pages_manage_engagement,pages_show_list,pages_manage_posts,pages_messaging,pages_manage_metadata",
        return_scopes: true,
      }
    );
  };
  return (
    <>
      <Box>
        <NavBar />
        <Grid container>
          <Grid item md={6} xs={12}>
            <img
              style={{ height: "100%", width: "100%" }}
              src="/landing.gif"
              alt="landing gif"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Box
              className={classes.contentBox}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              // alignItems="flex-start"
            >
              <p className={classes.header}>Hola,</p>
              <p className={classes.greeting}>Welcome to TicketHelper!</p>
              <p className={classes.tagLine}>
                Your one stop shop to help you manage your social tickets.
              </p>
              <Button
                disabled={user.loading}
                className={classes.authBtn}
                variant="contained"
                color="primary"
                startIcon={<FacebookIcon />}
                onClick={handleFbAuth}
              >
                Authenticate with Facebook
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box className={classes.footer}>
          <p
            style={{
              margin: 0,
              color: "#CBB26A",
              padding: "20px 0px",
              textAlign: "center",
            }}
          >
            &#169; {new Date().getFullYear()} TicketHelper
          </p>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnack}
        onClose={() => setOpenSnack(false)}
        message={snackMessage}
        key={"Message snack"}
      />
    </>
  );
}
