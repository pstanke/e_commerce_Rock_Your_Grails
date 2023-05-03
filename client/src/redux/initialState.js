import { initialCartState } from './cartRedux';
import { initialProductsState } from './productsRedux';
import { initialUserState } from './usersRedux';

export const initialState = {
  products: initialProductsState,
  user: initialUserState,
  cart: initialCartState,
};
