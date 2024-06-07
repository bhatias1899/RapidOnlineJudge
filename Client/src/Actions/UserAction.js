import axios from "axios";
import {
  CREATE_NEW_USER_API,
  DELETE_USER_API,
  GET_USER_API,
  LOGIN_USER_API,
  LOGOUT_USER_API,
  UPDATE_USER_API,
} from "../ApiEndpoints/apiEndpoint";
import * as actionType from "./actionTypes";
import { SERVER_BASE_URL } from "../Constants";

export const createUser = (payload) => {
  return function (dispatch) {
    axios
      .post(`${SERVER_BASE_URL}${CREATE_NEW_USER_API}`, payload)

      .then((res) => {
        dispatch({
          type: actionType.CREATE_NEW_USER,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionType.CREATE_NEW_USER_FAILED,
          payload: err,
        });
      });
  };
};
export const fetchProfile = (changeStates) => {
  return function (dispatch) {
    axios
      .get(`${SERVER_BASE_URL}${GET_USER_API}`, { withCredentials: true })
      .then((res) => {
        changeStates(res.data.user);
        dispatch({
          type: actionType.LOGIN_USER,
          payload: res.data,
        });
      })
      .catch((err) => {
        changeStates(null);
        dispatch({
          type: actionType.LOGIN_USER_FAILED,
          payload: err,
        });
      });
  };
};

export const updateUser = (payload) => {
  return function (dispatch) {
    axios
      .post(`${SERVER_BASE_URL}${UPDATE_USER_API}`, payload, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({
          type: actionType.LOGIN_USER,
          payload: res.data,
        });
      })
      .catch((err) => {
      });
  };
};

export const deleteUser = () => {
  return function (dispatch) {
    axios
      .get(`${SERVER_BASE_URL}${DELETE_USER_API}`, { withCredentials: true })
      .then((res) => {
        dispatch({
          type: actionType.LOGIN_USER,
          payload: null,
        });
      })
      .catch((err) => {
      });
  };
};
export const loginUser = (payload) => {
  return function (dispatch) {
    axios
      .post(`${SERVER_BASE_URL}${LOGIN_USER_API}`, payload, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({
          type: actionType.LOGIN_USER,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionType.LOGIN_USER_FAILED,
          payload: err,
        });
      });
  };
};

export const logoutUser = () => {
  return function (dispatch) {
    axios
      .get(`${SERVER_BASE_URL}${LOGOUT_USER_API}`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({
          type: actionType.LOGIN_USER,
          payload: null,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionType.LOGIN_USER_FAILED,
          payload: err,
        });
      });
  };
};
