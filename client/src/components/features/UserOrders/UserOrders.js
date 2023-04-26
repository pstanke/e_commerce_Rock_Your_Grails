import { Accordion, Card, Col, Row } from 'react-bootstrap';

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
              <Col>
                <div>
                  <strong>Address: </strong>
                  {order.address}
                </div>
              </Col>
              <Col className="d-flex justify-content-end">
                <div>
                  <strong>Total price: </strong>
                  {order.totalPrice}$
                </div>
              </Col>
            </Row>
            <Row>
              {order.orderedProducts.map((orderedProduct) => (
                <Col
                  className="d-flex justify-content-center"
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <Card className="mb-3">
                    <Card.Img
                      variant="top"
                      src={
                        process.env.PUBLIC_URL +
                        `/productsImages/${orderedProduct.product.photos[0].url} `
                      }
                    />
                    <Card.Body>
                      <Card.Title>{orderedProduct.product.name}</Card.Title>
                      <Card.Text>
                        <div>
                          <strong>Product price: </strong>
                          {orderedProduct.product.price}$
                        </div>
                        <div>
                          <strong>Quantity:</strong>
                          {orderedProduct.quantity}
                        </div>
                        <div>
                          <strong>Note:</strong>
                          {orderedProduct.note}
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
