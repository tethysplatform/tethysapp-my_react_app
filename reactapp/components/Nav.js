import React from 'react';
import BsNav from 'react-bootstrap/Nav';


const A = ({tethysApp}) => {
  return (
    <>
      <BsNav variant="pills" defaultActiveKey={tethysApp.rootUrl} className="flex-column">
        <BsNav.Link href={tethysApp.rootUrl}>Home</BsNav.Link>
        <BsNav.Link eventKey="link-1">Link</BsNav.Link>
        <BsNav.Link eventKey="link-2">Link</BsNav.Link>
        <BsNav.Link eventKey="disabled" disabled>
          Disabled
        </BsNav.Link>
      </BsNav>
    </>
  );
};

export default A;