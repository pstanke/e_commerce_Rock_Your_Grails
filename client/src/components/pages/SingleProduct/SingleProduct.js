import { useParams } from 'react-router-dom';
import { getProductById, getRequests } from '../../../redux/productsRedux';
import { useSelector } from 'react-redux';
import { Alert, Carousel, ProgressBar } from 'react-bootstrap';

export const SingleProduct = () => {
  const { id } = useParams();
  const productData = useSelector((state) => getProductById(state, id));
  const request = useSelector(getRequests);

  if (request.pending) {
    return <ProgressBar striped variant="danger" now={80} />;
  } else if (request.error) {
    return <Alert color="warning">{request.error}</Alert>;
  } else if (!request.success || !productData) {
    return <Alert color="info">Product Found</Alert>;
  } else if (request.success) {
    return (
      <>
        <Carousel>
          {productData.photos.map((photo) => (
            <Carousel.Item interval={1000}>
              <img
                className="d-block w-100"
                src={process.env.PUBLIC_URL + `/productsImages/${photo.url} `}
                alt={photo.url}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <h1>{productData.name}</h1>
      </>
    );
  }
};
