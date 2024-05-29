import * as actionType from "../Actions/actionTypes";

const initial_state = {
  userData: null,
};

const UserReducer = (state = initial_state, action) => {
  switch (action.type) {
    case actionType.CREATE_NEW_USER:
      return {
        ...state,
        userData: action.payload,
      };
    case actionType.LOGIN_USER:
      return {
        ...state,
        userData: action.payload,
      };
    case actionType.CREATE_NEW_USER_FAILED:
      return {
        ...state,
        userData:null
      };
    case actionType.LOGIN_USER_FAILED:
      return {
        ...state,
        userData:null
      };
    
    default:
      return state;
  }
};

export default UserReducer;
