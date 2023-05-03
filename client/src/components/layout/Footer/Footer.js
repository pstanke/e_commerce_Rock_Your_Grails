/* eslint-disable react/jsx-no-target-blank */
import { Col, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { useState } from 'react';

export const Footer = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  return (
    <Row className="mt-5">
      {show && (
        <Col className="d-flex align-items-center">
          <small className="text-danger text-nowrap">
            Here should be a shop footer but...
          </small>
        </Col>
      )}

      {!show && (
        <Col className="d-flex justify-content-center">
          <div onClick={handleShow} style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faUserSecret} size="2x" />
          </div>
        </Col>
      )}

      {show && (
        <Col className="d-flex justify-content-end">
          <div>
            <a
              href="https://www.linkedin.com/in/pawe%C5%82-stanke-a4419a26b/"
              target="_blank"
              style={{ color: 'red', marginRight: '10px' }}
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a
              href="https://github.com/pstanke"
              target="_blank"
              style={{ color: 'red' }}
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </div>
        </Col>
      )}
    </Row>
  );
};
