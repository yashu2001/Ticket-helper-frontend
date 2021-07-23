import { SET_USER, TOGGLE_LOAD_USER, CLEAR_USER } from "./userStoreTypes";

export const Authenticate = (user) => async (dispatch) => {
  dispatch({ type: TOGGLE_LOAD_USER });
  const response = await fetch(`http://localhost:5000/api/user/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
  if (response.status === 200) {
    const data = await response.json();
    dispatch({ type: SET_USER, payload: data });
  } else {
    console.log(response);
    dispatch({ type: TOGGLE_LOAD_USER });
  }
};

export const getUserData = (accessToken) => async (dispatch) => {
  dispatch({ type: TOGGLE_LOAD_USER });
  let resp = await fetch(`http://localhost:5000/api/user/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken,
    },
  });
  if (resp.status === 200) {
    const data = await resp.json();
    localStorage.setItem("accessToken", accessToken);
    dispatch({ type: SET_USER, payload: data });
  } else {
    dispatch({ type: TOGGLE_LOAD_USER });
    console.log(resp);
  }
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  return{
    type: CLEAR_USER
  }
};
