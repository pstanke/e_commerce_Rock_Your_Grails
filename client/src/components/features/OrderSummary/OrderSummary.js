import {
  Accordion,
  Button,
  Col,
  Row,
  Form,
  Alert,
  Spinner,
} from 'react-bootstrap';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import {
  getCartTotal,
  getProductsInCart,
  resetCartRequest,
} from '../../../redux/cartRedux';
import { getUser, loadUserOrdersRequest } from '../../../redux/usersRedux';

import { OrderProduct } from '../../common/OrderProduct/OrderProduct';
import { addressString } from '../../../utils/addressString';
import { API_URL } from '../../../config';
import { Navigate } from 'react-router-dom';

export const OrderSummary = () => {
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [status, setStatus] = useState(null); //loading, success, serverError, clientError,

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const address = addressString({
    street,
    house,
    state,
    postalCode,
    city,
    country,
  });

  const orderProducts = useSelector(getProductsInCart);
  const totalPrice = useSelector(getCartTotal);
  const user = useSelector(getUser);

  const userId = user ? user.id : null;

  const handleSubmit = () => {
    const orderData = {
      userId,
      address,
      totalPrice,
    };

    const orderedProducts = orderProducts.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      note: item.note,
    }));

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderData,
        orderedProducts,
      }),
    };

    setStatus('loading');
    fetch(`${API_URL}/orders`, options)
      .then((res) => {
        if (res.status === 201) {
          setStatus('success');
          dispatch(resetCartRequest());
          console.log(res.json());
          dispatch(loadUserOrdersRequest(user));
        } else if (res.status === 400) {
          setStatus('clientError');
          throw new Error('clientError');
        } else {
          setStatus('serverError');
          throw new Error('serverError');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (!user) {
    return <Navigate to={'/cart'} />;
  }

  return (
    <>
      {status === 'success' && (
        <Alert className="d-flex justify-content-between" variant="success">
          We will send you an email with further instructions
          <Alert.Link href="/user">See your orders summary here </Alert.Link>
        </Alert>
      )}

      {status === 'serverError' && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error... Please try again later.</p>
        </Alert>
      )}

      {status === 'clientError' && (
        <Alert variant="danger">
          <Alert.Heading>Incorrect data</Alert.Heading>
          <p>Check provided data again...</p>
        </Alert>
      )}

      {status === 'loading' && (
        <Spinner
          animation="border"
          role="status"
          variant="danger"
          className="d-block mx-auto"
        ></Spinner>
      )}

      {status !== 'success' && (
        <>
          <Row>
            <Col className="d-flex justify-content-between align-items-center">
              <h1>{totalPrice} $</h1>
              <Button variant="danger" onClick={validate(handleSubmit)}>
                Submit
              </Button>
            </Col>
          </Row>
          <Form className="col-md-8  mx-auto">
            <Row>
              <Col className="col-12 col-md-6">
                <Form.Group className="mb-3" controlId="formStreet">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    {...register('street', {
                      required: true,
                    })}
                    placeholder="Enter street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                  {errors.street && (
                    <small className="d-block form-text text-danger mt-2">
                      This field is required
                    </small>
                  )}
                </Form.Group>
              </Col>

              <Col className="col-12 col-md-6">
                <Form.Group className="mb-3" controlId="formHouse">
                  <Form.Label>House number</Form.Label>
                  <Form.Control
                    {...register('house', {
                      required: true,
                    })}
                    placeholder="Enter house number"
                    value={house}
                    onChange={(e) => setHouse(e.target.value)}
                  />
                  {errors.house && (
                    <small className="d-block form-text text-danger mt-2">
                      This field is required
                    </small>
                  )}
                </Form.Group>
              </Col>

              <Col className="col-12 col-md-6">
                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    {...register('city', {
                      required: true,
                    })}
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {errors.city && (
                    <small className="d-block form-text text-danger mt-2">
                      This field is required
                    </small>
                  )}
                </Form.Group>
              </Col>

              <Col className="col-12 col-md-6">
                <Form.Group className="mb-3" controlId="formPostal">
                  <Form.Label>Postal code</Form.Label>
                  <Form.Control
                    {...register('postalCode', {
                      required: true,
                    })}
                    placeholder="Enter postal code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                  {errors.postalCode && (
                    <small className="d-block form-text text-danger mt-2">
                      This field is required
                    </small>
                  )}
                </Form.Group>
              </Col>

              <Col className="col-12 col-md-6">
                <Form.Group className="mb-3" controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    {...register('state', {
                      required: true,
                    })}
                    placeholder="Enter state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                  {errors.state && (
                    <small className="d-block form-text text-danger mt-2">
                      This field is required
                    </small>
                  )}
                </Form.Group>
              </Col>

              <Col className="col-12 col-md-6">
                <Form.Group className="mb-3" controlId="formCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    {...register('country', {
                      required: true,
                    })}
                    placeholder="Enter Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  {errors.city && (
                    <small className="d-block form-text text-danger mt-2">
                      This field is required
                    </small>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Form>

          <Accordion flush>
            {orderProducts.map((product) => (
              <OrderProduct product={product} eventKey={product.id} />
            ))}
          </Accordion>
        </>
      )}
    </>
  );
};
