import { Nav, Navbar } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUser } from '../../../redux/usersRedux';

import { Logo } from '../../common/Logo/Logo';

export const MainMenu = () => {
  const user = useSelector(getUser);

  return (
    <section>
      <Logo />
      <Navbar className="d-flex justify-content-between my-3">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/cart">
            <FontAwesomeIcon icon={faCartShopping} size="2x" />
          </Nav.Link>
        </Nav>

        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/user">
            <FontAwesomeIcon icon={user ? faUser : faUserRegular} size="2x" />
          </Nav.Link>
        </Nav>
      </Navbar>
    </section>
  );
};
