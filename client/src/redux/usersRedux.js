import axios from 'axios';
import { API_URL } from '../config';

/* INITIAL STATE */
export const initialUserState = {
  user: null,
};

/* SELECTORS */
export const isUser = () => {
  const userString = localStorage.getItem('user');
  return userString ? JSON.parse(userString) : null;
};

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

export const setUserRequest = (payload) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const payloadString = JSON.stringify(payload);
      localStorage.setItem('user', payloadString);
      dispatch(setUser(payload));
      await dispatch(loadUserOrdersRequest(payload.id));

      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

const loadUserOrdersRequest = (id) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/orders/user/${id}`);
      localStorage.setItem(
        'user',
        JSON.stringify({ ...isUser(), orders: res.data }),
      );
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
      return { user: null };
    case SET_USER:
      return { user: action.payload };
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
