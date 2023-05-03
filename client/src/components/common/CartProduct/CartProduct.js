import {
  Button,
  Col,
  Image,
  InputGroup,
  FormControl,
  Row,
} from 'react-bootstrap';

import { QuantityPicker } from 'react-qty-picker';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import {
  addProductNoteRequest,
  changeQuantityRequest,
  removeProductRequest,
} from '../../../redux/cartRedux';

import { truncateString } from '../../../utils/truncateString';

export const CartProduct = ({ product }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const [note, setNote] = useState(product.note || '');

  const rightPhotoUrls = product.product.photos
    .filter((photo) => photo.type === 'RIGHT')
    .map((photo) => photo.url);

  const truncatedName = truncateString(product.product.name, 22);

  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeProductRequest({ product }));
  };
  const handleNote = (note) => {
    dispatch(addProductNoteRequest({ product, note }));
  };

  const handleQuantity = (quantity) => {
    if (quantity > 0) {
      dispatch(changeQuantityRequest({ product, quantity }));
      setQuantity(quantity);
    } else {
      dispatch(removeProductRequest({ product }));
    }
  };

  return (
    <>
      <Row className="mt-2 align-items-center">
        <Col xs={12} sm={6} className="d-flex justify-content-center ">
          <Image
            src={process.env.PUBLIC_URL + `/productsImages/${rightPhotoUrls} `}
            alt={product.product.name}
            fluid
            style={{ objectFit: 'cover', height: '200px', width: '250px' }}
          />
        </Col>

        <Col xs={12} sm={6} lg={5} xl={4}>
          <Row xs={12}>
            <div className="d-flex justify-content-between">
              <h4>{truncatedName}</h4>
              <h4>
                <strong>{product.product.price} $</strong>
              </h4>
            </div>

            <InputGroup>
              <FormControl
                placeholder="Add a note"
                className="form-control"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onBlur={() => handleNote(note)}
              />
            </InputGroup>
          </Row>

          <Row xs={12}>
            <div className="d-flex justify-content-between">
              <QuantityPicker
                smooth
                min={0}
                max={5}
                value={quantity}
                onChange={(value) => handleQuantity(value)}
              />
              <Button className="mt-2" variant="danger" onClick={handleRemove}>
                Remove
              </Button>
            </div>
          </Row>

          <small className="text-danger m-2">Max 5 in one order</small>
        </Col>
      </Row>
    </>
  );
};

CartProduct.propTypes = {
  product: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
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
