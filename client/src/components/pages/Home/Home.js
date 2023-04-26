import { useSelector } from 'react-redux';
import { Banner } from '../../features/Banner/Banner';
import { getProducts, getRequests } from '../../../redux/productsRedux';
import { ProgressBar } from 'react-bootstrap';

export const Home = () => {
  const products = useSelector(getProducts);
  const request = useSelector(getRequests);
  if (request.pending) {
    return <ProgressBar striped variant="danger" now={80} />;
  } else if (request.success) {
    return <Banner products={products} />;
  }
};
