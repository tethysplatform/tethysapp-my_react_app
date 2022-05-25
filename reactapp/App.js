import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Header from './components/Header';
import Menu from './components/Menu';
import Content from './components/Content';
import './App.css';


function App() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [tethysApp, setTethysApp] = React.useState({});
  const [navVisible, setNavVisible] = React.useState(false);

  // Note: The empty deps array [] means this effect will only run once.
  React.useEffect(() => {
    fetch(`${window.location.href}tethys-data/`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setTethysApp(result);
        },
        (error) => {
          setIsLoaded(true);
          console.error(error);
          setError(error);
        }
      )
  }, []);

  if (error) {
    return (
      <div>Error: {error.message}</div>
    );
  } else if (!isLoaded) {
    return (
      <div>Loading...</div>
    );
  } else {
    return (
      <div className="App">
          <Header tethysApp={tethysApp} onNavChange={setNavVisible} />
          <Menu navTitle="Navigation" onNavChange={setNavVisible} navVisible={navVisible}>
            <Nav variant="pills" defaultActiveKey={tethysApp.rootUrl} className="flex-column">
              <Nav.Link href={tethysApp.rootUrl}>Home</Nav.Link>
              <Nav.Link eventKey="link-1">Link</Nav.Link>
              <Nav.Link eventKey="link-2">Link</Nav.Link>
              <Nav.Link eventKey="disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav>
          </Menu>
          <Content tethysApp={tethysApp} />
      </div>
    );
  }
}

export default App;
