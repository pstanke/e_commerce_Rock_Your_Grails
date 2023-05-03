/* INITIAL STATE */
export const initialCartState = {
  products: [],
  total: 0,
  requestStatus: {
    error: null,
    pending: false,
    success: null,
  },
};

/* SELECTORS */
export const getProductsInCart = ({ cart }) => cart.products;

export const getCartTotal = ({ cart }) => cart.total;

/* ACTIONS */
// action name creator
const reducerName = 'cart';
const createActionName = (name) => `app/${reducerName}/${name}`;

const LOAD_CART_PRODUCTS = createActionName('LOAD_CART_PRODUCTS');
const LOAD_CART_TOTAL = createActionName('LOAD_CART_TOTAL');

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const loadCartProducts = (payload) => ({
  payload,
  type: LOAD_CART_PRODUCTS,
});

const loadCartTotal = (payload) => ({
  payload,
  type: LOAD_CART_TOTAL,
});

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = (error) => ({ error, type: ERROR_REQUEST });

/* THUNKS */
export const loadCartDataRequest = (key) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const dataString = localStorage.getItem(key);
      let data;

      if (dataString === null) {
        data = key === 'cartTotal' ? 0 : [];
        localStorage.setItem(key, JSON.stringify(data));
      } else {
        data = JSON.parse(dataString);
      }

      switch (key) {
        case 'cartProducts':
          dispatch(loadCartProducts(data));
          break;
        case 'cartTotal':
          dispatch(loadCartTotal(data));
          break;
        default:
          break;
      }
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

const calculateCartTotal = (cart) => {
  return (dispatch) => {
    let totalPrice = 0;

    cart.forEach((product) => {
      const totalProductPrice = product.product.price * product.quantity;
      totalPrice += totalProductPrice;
    });

    localStorage.setItem('cartTotal', JSON.stringify(totalPrice));
    dispatch(loadCartTotal(totalPrice));
  };
};

const getCartAndExistingProductIndex = (payload) => {
  const cartString = localStorage.getItem('cartProducts');
  const cart = JSON.parse(cartString);
  const existingProductIndex = cart.findIndex(
    (p) => p.product.id === payload.product.product.id,
  );
  return { cart, existingProductIndex };
};

const updateCart = (cart, dispatch) => {
  localStorage.setItem('cartProducts', JSON.stringify(cart));
  dispatch(loadCartProducts(cart));
  dispatch(calculateCartTotal(cart));
};

export const addProductNoteRequest = (payload) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const { cart, existingProductIndex } =
        getCartAndExistingProductIndex(payload);

      if (existingProductIndex >= 0) {
        cart[existingProductIndex].note = payload.note;
        updateCart(cart, dispatch);
      }
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const changeQuantityRequest = (payload) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const { cart, existingProductIndex } =
        getCartAndExistingProductIndex(payload);

      if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity = payload.quantity;
        updateCart(cart, dispatch);
      }
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const addToCartRequest = (payload) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const cartString = localStorage.getItem('cartProducts');
      const cart = JSON.parse(cartString);
      const existingProductIndex = cart.findIndex(
        (p) => p.product.id === payload.product.id,
      );

      if (existingProductIndex >= 0) {
        const existingQuantity = cart[existingProductIndex].quantity;
        const newQuantity = existingQuantity + payload.quantity;
        cart[existingProductIndex].quantity =
          newQuantity <= 5 ? newQuantity : existingQuantity;
      } else {
        cart.push(payload);
      }
      updateCart(cart, dispatch);

      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const removeProductRequest = (payload) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const { cart, existingProductIndex } =
        getCartAndExistingProductIndex(payload);
      cart.splice(existingProductIndex, 1);

      updateCart(cart, dispatch);
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const resetCartRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      localStorage.removeItem('cartProducts');
      localStorage.removeItem('cartTotal');
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

/* REDUCER */
export const cartReducer = (statePart = initialCartState, action) => {
  switch (action.type) {
    case LOAD_CART_PRODUCTS:
      return { ...statePart, products: action.payload };
    case LOAD_CART_TOTAL:
      return { ...statePart, total: action.payload };
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
