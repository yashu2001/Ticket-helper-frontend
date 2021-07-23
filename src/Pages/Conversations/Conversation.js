// Core react imports
import React from "react";
// ui lib imports
import { Box, makeStyles, Avatar } from "@material-ui/core";
// Making styles hook
const useStyles = makeStyles((theme) => ({
  box: {
    padding: "20px 8px",
    backgroundColor: "#f8f8f8",
    borderBottom: "1px solid #000",
    "&:hover": {
        cursor: "pointer",
        backgroundColor: "#999999",
    },
  },
  sender: {
    fontSize: "18px",
    fontWeight: "550",
    color: "#000",
    padding: 0,
    margin: 0,
  },
  conversationType: {
    padding: 0,
    margin: 0,
    fontSize: "12px",
  },
}));
// Exporting functional component
export default function Conversation(props) {
  const classes = useStyles();
  return (
    <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          className={classes.box}
          onClick={ ()=>props.selectConversation(props.conversation.id)}
    >
      <Box flexGrow={0.5}>
        <Avatar
          alt="sender-avatar"
          src={`https://graph.facebook.com/${props.conversation.from.id}/picture?type=square`}
        />
      </Box>
      <Box flexGrow={4}>
        <p className={classes.sender}>{props.conversation.from.name}</p>
        <p className={classes.conversationType}>
          Type:{"  "} {props.conversation.type}
        </p>
      </Box>
    </Box>
  );
}
