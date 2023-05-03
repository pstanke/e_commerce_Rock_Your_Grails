import Container from 'react-bootstrap/Container';

import PropTypes from 'prop-types';

import { Footer } from './../Footer/Footer';
import { MainMenu } from './../MainMenu/MainMenu';

import styles from './MainLayout.module.scss';

export const MainLayout = ({ children }) => {
  return (
    <Container className={styles.body}>
      <MainMenu />
      <div className={styles.children}>{children}</div>
      <Footer />
    </Container>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
