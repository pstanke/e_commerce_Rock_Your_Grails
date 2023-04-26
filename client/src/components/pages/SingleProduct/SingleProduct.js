import { useParams } from 'react-router-dom';
import { getProductById, getRequests } from '../../../redux/productsRedux';
import { useSelector } from 'react-redux';
import { Alert, Carousel, Col, ProgressBar, Row } from 'react-bootstrap';
import { TextComponent } from '../../../utils/textComponent';
import styles from './SingleProduct.module.scss';
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
        <Row>
          <Col xs={12} lg={8}>
            <Carousel>
              {productData.photos.map((photo) => (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={
                      process.env.PUBLIC_URL + `/productsImages/${photo.url} `
                    }
                    alt={photo.url}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col className={styles.productInfo}>
            <h1>{productData.name}</h1>
            <h3>
              <strong>{productData.price}$</strong>
            </h3>
            <TextComponent text={productData.description} maxTextLength={100} />
          </Col>
        </Row>
      </>
    );
  }
};
