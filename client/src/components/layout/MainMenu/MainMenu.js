import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Logo } from '../../common/Logo/Logo';
export const MainMenu = () => {
  return (
    <section>
      <Logo />
      <Navbar>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/">
            home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/cart">
            cart
          </Nav.Link>
          <Nav.Link as={NavLink} to="/user">
            user
          </Nav.Link>
        </Nav>
      </Navbar>
    </section>
  );
};
