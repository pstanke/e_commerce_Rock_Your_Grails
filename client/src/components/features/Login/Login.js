import { Alert, Button, Form, Spinner } from 'react-bootstrap';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { API_URL } from '../../../config';
import { logInUserRequest } from '../../../redux/usersRedux';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); //loading, success, serverError, clientError,

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };
    setStatus('loading');
    fetch(`${API_URL}/auth/login`, options)
      .then((res) => {
        if (res.status === 201) {
          setStatus('success');
          return res.json();
        } else if (res.status === 401) {
          setStatus('clientError');
          throw new Error('clientError');
        } else {
          setStatus('serverError');
          throw new Error('serverError');
        }
      })
      .then((res) => {
        dispatch(logInUserRequest(res));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Form className="col-12  mx-auto" onSubmit={handleSubmit}>
        {status === 'success' && <Navigate to="/user" />}

        {status === 'serverError' && (
          <Alert variant="danger">
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error... Please try again later.</p>
          </Alert>
        )}

        {status === 'clientError' && (
          <Alert variant="danger">
            <Alert.Heading>Incorrect data</Alert.Heading>
            <p>Login or password are incorrect...</p>
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

        <h1>Log in</h1>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="danger" type="submit" className="col-12  my-3">
          Sign in
        </Button>
      </Form>
      <div className="d-flex justify-content-center mt-3">
        <h4> New to Rock Your Grails?</h4>
      </div>

      <Button
        as={Link}
        to="/register"
        variant="light"
        className="col-12  mx-auto"
      >
        Create account
      </Button>
    </>
  );
};
