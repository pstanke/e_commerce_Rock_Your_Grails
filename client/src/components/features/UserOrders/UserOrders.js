import { Accordion, Col, Row } from 'react-bootstrap';

import PropTypes from 'prop-types';

import { OrderProduct } from '../../common/OrderProduct/OrderProduct';

export const UserOrders = ({ orders }) => {
  return (
    <Accordion flush>
      {orders.map((order) => (
        <Accordion.Item eventKey={order.id}>
          <Accordion.Header>
            <div>
              <strong>Order: </strong> {order.id}
            </div>
          </Accordion.Header>

          <Accordion.Body>
            <Row className="mb-3">
              <Col xs={9}>
                <div>
                  <strong>Address: </strong>
                  {order.address}
                </div>
              </Col>

              <Col xs={3} className="d-flex justify-content-end">
                <div>
                  <strong>Total price: </strong>
                  {order.totalPrice}$
                </div>
              </Col>
            </Row>

            <Row>
              <Accordion flush>
                {order.orderProducts.map((orderedProduct) => (
                  <OrderProduct product={orderedProduct} />
                ))}
              </Accordion>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

UserOrders.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      totalPrice: PropTypes.number.isRequired,
      orderProducts: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
          price: PropTypes.number.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
};
