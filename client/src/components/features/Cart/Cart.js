import { Alert, Button, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCartTotal, getProductsInCart } from '../../../redux/cartRedux';
import { getUser } from '../../../redux/usersRedux';

import { CartProduct } from '../../common/CartProduct/CartProduct';

import styles from './Cart.module.scss';

export const Cart = () => {
  const products = useSelector(getProductsInCart);
  const total = useSelector(getCartTotal);
  const user = useSelector(getUser);

  if (!products.length) {
    return (
      <Alert className={styles.alert} variant={'danger'}>
        Cart empty.
        <Alert.Link href="/products">Find some grails here</Alert.Link>
      </Alert>
    );
  } else {
    return (
      <>
        <Row>
          <Col className={styles.total}>
            <h1>{total} $</h1>
            {user ? (
              <Button as={Link} to="/order" variant="outline-danger">
                proceed order
              </Button>
            ) : (
              <Button as={Link} to="/user" variant="outline-danger">
                Login
              </Button>
            )}
          </Col>
        </Row>

        {products.map((product) => (
          <CartProduct product={product} />
        ))}

        <Link to={`/products`} className={styles.link}>
          <small>Are you sure that's all you need?</small>
        </Link>
      </>
    );
  }
};
