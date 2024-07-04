import axios from "axios";
import {
  CREATE_PROBLEM_API,
  DELETE_PROBLEM_API,
  GET_PROBLEMS_API,
} from "../ApiEndpoints/apiEndpoint";
import { CREATE_NEW_PROBLEM, DELETE_PROBLEM, GET_PROBLEMS } from "./actionTypes";

export const createProblem = (payload) => {
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}${CREATE_PROBLEM_API}`, payload, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({
          type: CREATE_NEW_PROBLEM,
          payload: res.data,
        });
        dispatch(getProblems());
      })
      .catch((err) => {
        dispatch({
          type: CREATE_NEW_PROBLEM,
          payload: null,
        });
      });
  };
};

export const getProblems = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}${GET_PROBLEMS_API}${id ? `/${id}` : ""}`,
        { withCredentials: true }
      );
      dispatch({
        type: GET_PROBLEMS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: GET_PROBLEMS,
        payload: null,
      });
    }
  };
};
export const deleteProblem=(id)=>{
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}${DELETE_PROBLEM_API}${id ? `/${id}` : ""}`,
        { withCredentials: true }
      );
      dispatch({
        type: DELETE_PROBLEM,
        payload: response.data.problems,
      });
    } catch (err) {
      dispatch({
        type: GET_PROBLEMS,
        payload: null,
      });
    }
  };
}
