import { Alert, Button, Col, Row } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUser } from '../../../redux/usersRedux';

import { Login } from '../../features/Login/Login';
import { UserOrders } from '../../features/UserOrders/UserOrders';

export const UserPanel = () => {
  const user = useSelector(getUser);

  if (!user) {
    return <Login />;
  } else {
    return (
      <>
        <Row>
          <Col>
            <h1>Hello {user.name}</h1>
          </Col>
        </Row>

        <Col className="d-flex justify-content-end">
          <Button as={Link} to={'/logout'} variant="danger">
            Log Out
          </Button>
        </Col>

        <h4>Your Orders</h4>

        {user.orders && user.orders.length > 0 && (
          <UserOrders orders={user.orders} />
        )}

        {user.orders && user.orders.length === 0 && (
          <Alert className="d-flex justify-content-center" variant={'danger'}>
            No orders yet.
            <Alert.Link href="/products">Order something ASAP</Alert.Link>
          </Alert>
        )}
      </>
    );
  }
};
