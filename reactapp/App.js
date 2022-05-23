import './App.css';
import Header from './components/Header';
import TethysNav from './components/Nav';
import Nav from 'react-bootstrap/Nav';
import React from 'react';


function App(props) {
  const [navVisible, setNavVisible] = React.useState(false);
  return (
    <div className="App">
        <Header tethysApp={props.tethysApp} onNavChange={setNavVisible}/>
        <TethysNav navTitle="Navigation" onNavChange={setNavVisible} navVisible={navVisible}>
          <Nav variant="pills" defaultActiveKey={props.tethysApp.rootUrl} className="flex-column">
            <Nav.Link href={props.tethysApp.rootUrl}>Home</Nav.Link>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav>
        </TethysNav>
    </div>
  );
}

export default App;
