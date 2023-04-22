import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getProducts = ({ products }) => products.data;

export const getRequests = ({ products }) => products.requestStatus;

export const getProductById = (state, id) =>
  state.products.data.find((product) => product.id === id);

/* ACTIONS */

// action name creator
const reducerName = 'products';
const createActionName = (name) => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = (error) => ({ error, type: ERROR_REQUEST });

export const loadProducts = (payload) => ({ payload, type: LOAD_PRODUCTS });

/* THUNKS */

export const loadProductsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/products`);
      dispatch(loadProducts(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

/* INITIAL STATE */

export const initialProductsState = {
  data: [],
  requestStatus: {
    error: null,
    pending: false,
    success: null,
  },
};

/* REDUCER */

export const productsReducer = (statePart = initialProductsState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return { ...statePart, data: [...action.payload] };

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
