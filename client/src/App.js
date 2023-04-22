import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Home } from './components/pages/Home/Home';
import { AllProducts } from './components/features/AllProducts/AllProducts';
import { SingleProduct } from './components/pages/SingleProduct/SingleProduct';
import { Register } from './components/features/Register/Register';
import { Login } from './components/features/Login/Login';
import { Logout } from './components/features/Logout/Logout';
import { NotFound } from './components/pages/NotFound/NotFound';
import { Cart } from './components/features/Cart/Cart';
import { OrderSummary } from './components/features/OrderSummary/OrderSummary';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadProductsRequest } from './redux/productsRedux';
import { API_URL } from './config';
import { setUser } from './redux/usersRedux';
export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      credentials: 'include',
      method: 'GET',
    };

    fetch(`${API_URL}/auth/user`, options)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          throw new Error('authorization failed');
        }
      })
      .then((res) => {
        dispatch(setUser(res));
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(loadProductsRequest());
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
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
