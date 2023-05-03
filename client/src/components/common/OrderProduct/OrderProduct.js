import { Accordion, Col, Image, Row } from 'react-bootstrap';

import PropTypes from 'prop-types';

export const OrderProduct = ({ product }) => {
  const rightPhotoUrls = product.product.photos
    .filter((photo) => photo.type === 'RIGHT')
    .map((photo) => photo.url);

  return (
    <Accordion.Item eventKey={product.product.id}>
      <Accordion.Header>
        <div>
          <strong>{product.product.name}</strong>
        </div>
      </Accordion.Header>

      <Accordion.Body>
        <Row className="mt-2 align-items-center">
          <Col xs={12} sm={6} className="d-flex justify-content-center ">
            <Image
              src={
                process.env.PUBLIC_URL + `/productsImages/${rightPhotoUrls} `
              }
              alt={product.product.name}
              fluid
              style={{
                objectFit: 'cover',
                height: '200px',
                width: '250px',
              }}
            />
          </Col>

          <Col xs={12} sm={6}>
            <h4>
              Price: <strong>{product.product.price} $</strong>
            </h4>
            <h4>
              Note: <strong>{product.note} </strong>
            </h4>
            <h4>
              Quantity: <strong>{product.quantity}</strong>
            </h4>
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
};

OrderProduct.propTypes = {
  product: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    note: PropTypes.string,
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
};
