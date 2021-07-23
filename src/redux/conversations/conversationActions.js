import {
  SET_CONVERSATIONS,
  SET_SELECTED_CONVERSATION,
  TOGGLE_CONVERSATION_LOAD,
} from "./conversationTypes";

export const fetchConversations =
  (selectedPage, accessToken) => async (dispatch) => {
    dispatch({ type: TOGGLE_CONVERSATION_LOAD });
    let resp = await fetch("http://localhost:5000/api/conversations", {
      method: "POST",
      headers: {
        "CONTENT-TYPE": "application/json",
        "x-access-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ pageId: selectedPage }),
    });
    if (resp.status === 200) {
      let body = await resp.json();
      dispatch({
        type: SET_CONVERSATIONS,
        payload: body,
      });
    } else {
      console.log(resp);
    }
  };

export const loadConversationWithId =
  (conversationId, accessToken) => async (dispatch) => {
    let response = await fetch(
      "http://localhost:5000/api/conversations/" + conversationId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("accessToken"),
        },
      }
    );
    if (response.ok) {
      let body = await response.json();
      dispatch({ type: SET_SELECTED_CONVERSATION, payload: body.comments });
    } else {
      console.log(response);
    }
  };
