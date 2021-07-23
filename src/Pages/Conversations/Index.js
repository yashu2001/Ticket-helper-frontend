// Core react imports
import React, { useEffect, useState } from "react";
// Routing imports
import { useHistory } from "react-router-dom";
// Ui lib imports
import { Box, makeStyles, Grid } from "@material-ui/core";
// Custom component imports
import Conversation from "./Conversation";
// Icon imports
import RefreshIcon from "@material-ui/icons/Refresh";
// Redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  fetchConversations,
  loadConversationWithId,
} from "../../redux/conversations/conversationActions";
// Creating style hook
const useStyles = makeStyles((theme) => ({
  conversationsHeader: {
    fontSize: "26px",
    lineHeight: "30px",
    fontWeight: "800",
    letterSpacing: "0.02em",
  },
  headerBox: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
  },
  refreshIcon: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
// Exporting default page component
export default function DashBoard() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.conversations);
  useEffect(() => {
    if (!user.authenticated) {
      history.push("/");
    } else {
      dispatch(fetchConversations(user.pages[0].id, user.accessToken));
    }
  }, [history, dispatch, user]);
  useEffect(() => {
    if (selectedConversation) {
      dispatch(loadConversationWithId(selectedConversation));
    }
  }, [selectedConversation, dispatch]);
  const refreshHandler = () => {
    setSelectedConversation(null);
    dispatch(fetchConversations(user.pages[0].id, user.accessToken));
  };

  const selectConversation = (conversationId) => {
    setSelectedConversation(conversationId);
  };
  return (
    <Grid container>
      <Grid item xs={3} style={{ height: "100vh", overflowY: "auto" }}>
        <Box
          className={classes.headerBox}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ position: "sticky", top: 0, zIndex: 100 }}
        >
          <p className={classes.conversationsHeader}>Conversations</p>
          <RefreshIcon
            className={classes.refreshIcon}
            fontSize="large"
            onClick={refreshHandler}
          />
        </Box>
        {conversations.conversations.map((conversation) => {
          return (
            <Conversation
              key={conversation.id}
              conversation={conversation}
              selectConversation={selectConversation}
            />
          );
        })}
      </Grid>
      {conversations.conversations.filter(
        (conversation) => conversation.id === selectedConversation
      ).length ? (
        <>
          <Grid item xs={5}>
            <Box
              className={classes.headerBox}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              style={{ position: "sticky", top: 0, zIndex: 100 }}
            >
              <p className={classes.conversationsHeader}>
                {conversations.conversations.filter(
                  (conversation) => conversation.id === selectedConversation
                ).length
                  ? conversations.conversations.filter(
                      (conversation) => conversation.id === selectedConversation
                    )[0].from.name
                  : ""}
              </p>
            </Box>
            <Box
              style={{
                padding: "10px",
                height: "70vh",
                overflowY: "auto",
              }}
            >
              {conversations.selectedConversation &&
                conversations.selectedConversation.map((conversation) => {
                  return (
                    <p
                      style={
                        conversation.from.id === user.pages[0].id
                          ? { textAlign: "right", margin: "20px" }
                          : { textAlign: "left", margin: "20px" }
                      }
                    >
                      <span
                        style={{
                          backgroundColor: "#f4f4f4",
                          padding: "4px 10px",
                        }}
                      >
                        {conversation.message}
                      </span>
                    </p>
                  );
                })}
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <input
                style={{ width: "80%", padding: "20px" }}
                type="text"
                placeholder="Type a message in here"
              />
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </>
      ) : (
        <></>
      )}
    </Grid>
  );
}
