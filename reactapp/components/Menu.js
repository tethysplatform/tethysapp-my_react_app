import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';


const Menu = ({children, navTitle, onNavChange, navVisible, ...props}) => {
  const handleClose = () => onNavChange(false);

  return (
    <>
      <Offcanvas show={navVisible} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{navTitle}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Menu;