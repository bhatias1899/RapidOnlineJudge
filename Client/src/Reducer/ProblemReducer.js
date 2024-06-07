import * as actionType from "../Actions/actionTypes";

const initial_state = {
  problemsData: [],
};

const ProblemReducer = (state = initial_state, action) => {
  switch (action.type) {
    case actionType.GET_PROBLEMS:
      return {
        ...state,
        problemsData: action.payload,
      };
    default:
      return state;
  }
};

export default ProblemReducer;
