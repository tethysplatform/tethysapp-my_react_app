import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Header from './components/Header';
import Menu from './components/Menu';
import Content from './components/Content';
import './App.css';


function App(props) {
  const [navVisible, setNavVisible] = React.useState(false);
  return (
    <div className="App">
        <Header tethysApp={props.tethysApp} onNavChange={setNavVisible} />
        <Menu navTitle="Navigation" onNavChange={setNavVisible} navVisible={navVisible}>
          <Nav variant="pills" defaultActiveKey={props.tethysApp.rootUrl} className="flex-column">
            <Nav.Link href={props.tethysApp.rootUrl}>Home</Nav.Link>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav>
        </Menu>
        <Content tethysApp={props.tethysApp} />
    </div>
  );
}

export default App;
