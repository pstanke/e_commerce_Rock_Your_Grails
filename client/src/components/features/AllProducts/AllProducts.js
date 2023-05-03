import { Alert, Col, Container, ProgressBar, Row } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { getProducts, getRequests } from '../../../redux/productsRedux';

import { ProductSummary } from '../../common/ProductSummary/ProductSummary';

export const AllProducts = () => {
  const products = useSelector(getProducts);
  const request = useSelector(getRequests);

  if (request.pending) {
    return <ProgressBar striped variant="danger" now={80} />;
  } else if (request.error) {
    return <Alert color="warning">{request.error}</Alert>;
  } else if (!request.success || !products.length) {
    return <Alert color="info">No Products Found</Alert>;
  } else if (request.success) {
    return (
      <Container>
        <Row>
          {products.map((product) => (
            <Col
              key={product.id}
              xs={12}
              md={6}
              xl={4}
              className="d-flex justify-content-center"
            >
              <ProductSummary product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
};
