import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import logo from './smallLogo.png';

export const Logo = () => {
  return (
    <Nav.Link as={NavLink} to="/">
      <div className="d-flex justify-content-center">
        <img src={logo} alt="Logo" className="img-fluid" />
      </div>
    </Nav.Link>
  );
};
