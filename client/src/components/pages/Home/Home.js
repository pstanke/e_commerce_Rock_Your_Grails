import { ProgressBar } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { getProducts, getRequests } from '../../../redux/productsRedux';

import { Banner } from '../../features/Banner/Banner';

export const Home = () => {
  const products = useSelector(getProducts);
  const request = useSelector(getRequests);

  if (request.pending) {
    return <ProgressBar striped variant="danger" now={80} />;
  } else if (request.success) {
    return <Banner products={products} />;
  }
};
