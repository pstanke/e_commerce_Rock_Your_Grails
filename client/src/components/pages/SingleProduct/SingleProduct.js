import {
  Alert,
  Button,
  Carousel,
  Col,
  ProgressBar,
  Row,
} from 'react-bootstrap';

import { QuantityPicker } from 'react-qty-picker';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { addToCartRequest } from '../../../redux/cartRedux';
import { getProductById, getRequests } from '../../../redux/productsRedux';

import { TextComponent } from '../../../utils/TextComponent';

import styles from './SingleProduct.module.scss';

export const SingleProduct = () => {
  const { id } = useParams();
  const product = useSelector((state) => getProductById(state, id));
  const request = useSelector(getRequests);

  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (quantity > 0) {
      dispatch(addToCartRequest({ product, quantity }));
      navigate('/cart');
    }
  };

  if (request.pending) {
    return <ProgressBar striped variant="danger" now={80} />;
  } else if (request.error) {
    return <Alert color="warning">{request.error}</Alert>;
  } else if (!request.success || !product) {
    return <Alert color="info">Product Not Found</Alert>;
  } else if (request.success) {
    return (
      <>
        <Row>
          <Col xs={12} lg={8}>
            <Carousel>
              {product.photos.map((photo) => (
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
            <h1>{product.name}</h1>
            <h3 className="my-2">
              <strong>{product.price}$</strong>
            </h3>
            <Row className="my-2 align-items-baseline">
              <Col className="d-grid">
                <Button variant="success" onClick={handleAddToCart}>
                  Add to cart
                </Button>
              </Col>
              <Col className={styles.picker}>
                <QuantityPicker
                  smooth
                  min={0}
                  max={5}
                  value={quantity}
                  onChange={(quantity) => setQuantity(quantity)}
                />
              </Col>
            </Row>

            <TextComponent text={product.description} maxTextLength={100} />
          </Col>
        </Row>
      </>
    );
  }
};
