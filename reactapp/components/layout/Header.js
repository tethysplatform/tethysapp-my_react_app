import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { BsX, BsGear } from 'react-icons/bs';
import { LinkContainer } from 'react-router-bootstrap';

import HeaderButton from 'components/buttons/HeaderButton';
import NavButton from 'components/buttons/NavButton';
import { TethysAppContext, UserContext } from 'components/context';

const Header = ({onNavChange}) => {
  const tethysApp = useContext(TethysAppContext);
  const user = useContext(UserContext);
  const showNav = () => onNavChange(true);

  return (
    <>
      <Container fluid className="px-0">
        <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
          <Container fluid className="px-4">
            <NavButton onClick={showNav} className="me-2"></NavButton>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img 
                  src={tethysApp.icon} 
                  width="30" 
                  height="30"
                  className="d-inline-block align-top rounded-circle"
                  alt=""
                />{' ' + tethysApp.title}
              </Navbar.Brand>
            </LinkContainer>
            <Form inline="true">
              {user.isStaff && 
                <HeaderButton href={tethysApp.settingsUrl} tooltipPlacement="bottom" tooltipText="Settings" className="me-2"><BsGear size="1.5rem"/></HeaderButton>
              }
              <HeaderButton href={tethysApp.exitUrl} tooltipPlacement="bottom" tooltipText="Exit"><BsX size="1.5rem"/></HeaderButton>
            </Form>
          </Container>
        </Navbar>
      </Container>
    </>
  );
};

Header.propTypes = {
  onNavChange: PropTypes.func,
};

export default Header;