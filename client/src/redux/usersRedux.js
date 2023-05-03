/* IMPORTS */
import axios from 'axios';
import { API_URL } from '../config';

/* INITIAL STATE */
export const initialUserState = {
  user: null,
  requestStatus: {
    error: null,
    pending: false,
    success: null,
  },
};

/* SELECTORS */
export const getUser = ({ user }) => user.user;

export const getRequests = ({ user }) => user.requestStatus;

/* ACTIONS */
// action name creator
const reducerName = 'user';
const createActionName = (name) => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const SET_USER = createActionName('SET_USER');
const LOG_OUT = createActionName('LOG_OUT');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = (error) => ({ error, type: ERROR_REQUEST });

export const setUser = (payload) => ({ payload, type: SET_USER });
export const logOut = () => ({ type: LOG_OUT });

/* THUNKS */

export const loadUserRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;

      if (user !== null) {
        await dispatch(loadUserOrdersRequest(user));
      }
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const logInUserRequest = (payload) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const payloadString = JSON.stringify(payload);
      localStorage.setItem('user', payloadString);

      await dispatch(loadUserOrdersRequest(payload));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const loadUserOrdersRequest = (payload) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/orders/user/${payload.id}`);
      const updatedUser = { ...payload, orders: res.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      dispatch(setUser(updatedUser));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const logOutRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      localStorage.removeItem('user');
      dispatch(logOut());
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

/* REDUCER */
export const userReducer = (statePart = initialUserState, action) => {
  switch (action.type) {
    case LOG_OUT:
      return { ...statePart, user: null };
    case SET_USER:
      return { ...statePart, user: action.payload };
    case START_REQUEST:
      return {
        ...statePart,
        requestStatus: { pending: true, error: null, success: false },
      };
    case END_REQUEST:
      return {
        ...statePart,
        requestStatus: { pending: false, error: null, success: true },
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        requestStatus: {
          pending: false,
          error: action.payload.error,
          success: false,
        },
      };
    default:
      return statePart;
  }
};
