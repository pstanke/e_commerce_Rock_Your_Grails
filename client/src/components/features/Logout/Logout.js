import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutRequest } from '../../../redux/usersRedux';
import { useEffect } from 'react';

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      dispatch(logOutRequest());
      navigate('/');
    };
    handleLogout();
  }, [dispatch, navigate]);
  return null;
};
