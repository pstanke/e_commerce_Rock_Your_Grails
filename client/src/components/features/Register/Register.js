import { useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { API_URL } from '../../../config';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
export const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [status, setStatus] = useState(null); //loading, success, serverError, clientError, loginError

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleSubmit = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, password, passwordRepeat }),
    };
    setStatus('loading');
    fetch(`${API_URL}/auth/register`, options)
      .then((res) => {
        if (res.status === 201) {
          setStatus('success');
        } else if (res.status === 400) {
          setStatus('clientError');
        } else if (res.status === 409) {
          setStatus('emailError');
        } else {
          setStatus('serverError');
        }
      })
      .catch((err) => {
        setStatus('serverError');
      });
  };
  return (
    <>
      <Form className="col-12  mx-auto" onSubmit={validate(handleSubmit)}>
        {status === 'success' && (
          <Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>You have been successfully registered! You can now log in...</p>
          </Alert>
        )}
        {status === 'serverError' && (
          <Alert variant="danger">
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error... Please try again later.</p>
          </Alert>
        )}
        {status === 'clientError' && (
          <Alert variant="warning">
            <Alert.Heading>Not enough data</Alert.Heading>
            <p>You have to fill all the fields.</p>
          </Alert>
        )}

        {status === 'emailError' && (
          <Alert variant="warning">
            <Alert.Heading>Email already in use</Alert.Heading>
            <p>You have to use other email.</p>
          </Alert>
        )}
        {status === 'loading' && (
          <Spinner
            animation="border"
            role="status"
            variant="danger"
            className="d-block mx-auto"
          >
            {/* <span className="sr-only">Loading...</span> */}
          </Spinner>
        )}
        <h1>Sign up</h1>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            {...register('email', {
              required: true,
            })}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <small className="d-block form-text text-danger mt-2">
              This field is required
            </small>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            {...register('name', {
              required: true,
              minLength: 5,
              maxLength: 40,
            })}
            type="name"
            placeholder="Enter Name and Surname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <small className="d-block form-text text-danger mt-2">
              This field is required (min.5)(max.40)
            </small>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register('password', {
              required: true,
              minLength: 5,
              maxLength: 40,
            })}
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <small className="d-block form-text text-danger mt-2">
              This field is required (min.5)(max.40)
            </small>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPasswordRepeat">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            {...register('passwordRepeat', {
              required: true,
              minLength: 5,
              maxLength: 40,
            })}
            type="password"
            placeholder="Repeat Password"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
          {errors.passwordRepeat && (
            <small className="d-block form-text text-danger mt-2">
              This field is required (min.5)(max.40)
            </small>
          )}
        </Form.Group>

        <Button variant="danger" type="submit" className="col-12  my-3">
          Submit
        </Button>
      </Form>
      <div className="d-flex justify-content-center mt-3">
        <h4> Already a customer? </h4>
      </div>

      <Button as={Link} to="/login" variant="light" className="col-12  mx-auto">
        Log in
      </Button>
    </>
  );
};
