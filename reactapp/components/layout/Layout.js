import Nav from 'react-bootstrap/Nav';
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Header from './Header';
import NavMenu from './NavMenu';
import { TethysAppContext } from '../context';

function Layout({children}) {
  const tethysApp = useContext(TethysAppContext);
  const [navVisible, setNavVisible] = useState(false);

  return (
    <>
      <Header onNavChange={setNavVisible} />
      <NavMenu navTitle="Navigation"  navVisible={navVisible} onNavChange={setNavVisible}>
        <Nav variant="pills" defaultActiveKey={tethysApp.rootUrl} className="flex-column">
          <LinkContainer to="/" onClick={() => setNavVisible(false)}>
            <Nav.Link eventKey="link-map">Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/hydrograph" onClick={() => setNavVisible(false)}>
            <Nav.Link eventKey="link-plot">Hydrograph</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/learn-react" onClick={() => setNavVisible(false)}>
            <Nav.Link eventKey="link-learn-react">Learn React</Nav.Link>
          </LinkContainer>
        </Nav>
      </NavMenu>
      {children}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

export default Layout;