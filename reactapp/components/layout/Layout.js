import Color from 'color';
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Header from './Header';
import NavMenu from './NavMenu';
import { TethysAppContext } from '../context';

const AppNav = styled(Nav)`
  & .nav-link {
    color: ${props => props.app.color};
  }

  & .nav-link:hover {
    color: ${props => Color(props.app.color).darken(0.25)};
  }

  & .nav-link.active, &.nav-link:active {
    color: white;
    background-color: ${props => props.app.color};
  }
`;

function Layout({children}) {
  const tethysApp = useContext(TethysAppContext);
  const [navVisible, setNavVisible] = useState(false);

  return (
    <>
      <Header onNavChange={setNavVisible} />
      <NavMenu navTitle="Navigation"  navVisible={navVisible} onNavChange={setNavVisible}>
        <AppNav variant="pills" defaultActiveKey={tethysApp.rootUrl} app={tethysApp} className="flex-column">
          <LinkContainer to="/" onClick={() => setNavVisible(false)}>
            <Nav.Link eventKey="link-map">Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/learn-react" onClick={() => setNavVisible(false)}>
            <Nav.Link eventKey="link-learn-react">Learn React</Nav.Link>
          </LinkContainer>
        </AppNav>
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