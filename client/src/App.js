import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loadProductsRequest } from './redux/productsRedux';
import { loadUserRequest } from './redux/usersRedux';
import { loadCartDataRequest } from './redux/cartRedux';

import { MainLayout } from './components/layout/MainLayout/MainLayout';

import { Home } from './components/pages/Home/Home';
import { SingleProduct } from './components/pages/SingleProduct/SingleProduct';
import { NotFound } from './components/pages/NotFound/NotFound';
import { UserPanel } from './components/pages/UserPanel/UserPanel';
import { Login } from './components/features/Login/Login';

import { AllProducts } from './components/features/AllProducts/AllProducts';
import { Register } from './components/features/Register/Register';
import { Logout } from './components/features/Logout/Logout';
import { Cart } from './components/features/Cart/Cart';
import { OrderSummary } from './components/features/OrderSummary/OrderSummary';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsRequest());
    dispatch(loadUserRequest());
    dispatch(loadCartDataRequest('cartProducts'));
    dispatch(loadCartDataRequest('cartTotal'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/order" element={<OrderSummary />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<UserPanel />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
