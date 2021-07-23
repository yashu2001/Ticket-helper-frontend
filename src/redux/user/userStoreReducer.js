import { SET_USER, TOGGLE_LOAD_USER, CLEAR_USER } from "./userStoreTypes";
const initialState = {
  loading: false,
  id: null,
  image: null,
  name: "",
  authenticated: false,
  pages:[],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...action.payload, loading: false, authenticated: true };
    case TOGGLE_LOAD_USER:
      return { ...state, loading: !state.loading };
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
};
export default reducer;
