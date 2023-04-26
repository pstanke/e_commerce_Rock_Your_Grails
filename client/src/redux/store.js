import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//import state
import { initialState } from './initialState';

// import reducers
// import { userReducer } from './usersRedux';
import { productsReducer } from './productsRedux';
import { userReducer } from './usersRedux';

// combine reducers
const subReducers = {
  products: productsReducer,
  user: userReducer,
};
const reducer = combineReducers(subReducers);

const store = createStore(
  reducer,
  initialState,

  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f,
  ),
);

export default store;
