import {
  SET_CONVERSATIONS,
  TOGGLE_CONVERSATION_LOAD,
  SET_SELECTED_CONVERSATION,
} from "./conversationTypes";

const initialState = {
  loading: false,
  conversations: [],
  selectedConversation: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CONVERSATION_LOAD:
      return { ...state, loading: !state.loading };
    case SET_CONVERSATIONS:
      let conversations = [];
      action.payload.comments.map((comment) =>
        comment.map((c) => conversations.push({ ...c, type: "comment" }))
      );
      return {
        loading: false,
        conversations: conversations,
        selectedConversation: [],
        //   ...action.payload.messages.map((comment) => ({
        //     ...comment,
        //     type: "comment",
        //   })),
      };
    case SET_SELECTED_CONVERSATION:
      return {
        loading: false,
        conversations: state.conversations,
        selectedConversation: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
