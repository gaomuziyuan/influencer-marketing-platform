import { LOAD_STATE, SET_VALUE, CLEAR_STATE } from "./actionTypes";
import { initialState } from "./store";

const loadState = (initialState, userData) => {
  let newState;
  const serializedState = localStorage.getItem("state");
  if (serializedState !== null) {
    newState = JSON.parse(serializedState);
    newState.user = userData;
  } else {
    newState = {
      ...initialState,
      user: userData,
    };
  }
  return saveState(newState);
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
    return state;
  } catch (error) {
    // Ignore write errors.
  }
};

const clearState = (state) => {
  localStorage.removeItem("state");
  return state;
};

export const defaultReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_STATE:
      return loadState(state, action.value);
    case SET_VALUE:
      newState = {
        ...state,
        [action.key]: action.value,
      };
      return saveState(newState);
    case CLEAR_STATE:
      return clearState(state);
    default:
      return state;
  }
};
