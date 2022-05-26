import PropTypes from 'prop-types';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { BsX, BsGear } from 'react-icons/bs';
import HeaderButton from './HeaderButton';
import NavButton from './NavButton';
import { TethysAppPropType } from './propTypes';


const StyledNavbar = styled(Navbar)`
  background-color: ${props => props.navcolor || 'black'};
`;


const Header = ({tethysApp, onNavChange}) => {
  const showNav = () => onNavChange(true);

  return (
    <>
      <Container fluid className="px-0">
        <StyledNavbar navcolor={tethysApp.color} expand="lg" variant="dark" className="shadow">
          <Container fluid className="px-4">
            <NavButton onClick={showNav} className="me-2"></NavButton>
            <Navbar.Brand href="#">
              <img 
                src={tethysApp.icon} 
                width="30" 
                height="30"
                className="d-inline-block align-top rounded-circle"
                alt=""
              />{' ' + tethysApp.title}
            </Navbar.Brand>
            <Form inline="true">
              <HeaderButton href={tethysApp.settingsUrl} tooltipPlacement="bottom" tooltipText="Settings" className="me-2"><BsGear size="1.5rem"/></HeaderButton>
              <HeaderButton href={tethysApp.exitUrl} tooltipPlacement="bottom" tooltipText="Exit"><BsX size="1.5rem"/></HeaderButton>
            </Form>
          </Container>
        </StyledNavbar>
      </Container>
    </>
  );
};

Header.propTypes = {
  tethysApp: TethysAppPropType,
  onNavChange: PropTypes.func,
};

export default Header;