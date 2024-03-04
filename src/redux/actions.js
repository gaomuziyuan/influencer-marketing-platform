import { LOAD_STATE, SET_VALUE, CLEAR_STATE } from "./actionTypes";

const loadState = (value) => {
  return {
    type: LOAD_STATE,
    value: value,
  };
};

const setValue = (key, value) => {
  return {
    type: SET_VALUE,
    key: key,
    value: value,
  };
};

const clearState = () => {
  return {
    type: CLEAR_STATE,
  };
};

export { loadState, setValue, clearState };
