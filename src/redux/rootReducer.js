import { combineReducers } from "redux";

import userStoreReducer from "./user/userStoreReducer";
import conversationReducer from "./conversations/conversationReducer";
const rootReducer = combineReducers({
  user: userStoreReducer,
  conversations: conversationReducer,
});

export default rootReducer;
