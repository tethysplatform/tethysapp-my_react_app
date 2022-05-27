import './App.css';
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Content from './Content';
import Header from './Header';
import LoadingPage from './Loading';
import Menu from './Menu';


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tethysApp, setTethysApp] = useState({});
  const [navVisible, setNavVisible] = useState(false);

  // Note: The empty deps array [] means this effect will only run once.
  useEffect(() => {
    fetch(`${window.location.href}metadata/`)
      .then(res => res.json())
      .then(
        (result) => {
          setTimeout(() => {
            setIsLoaded(true);
            setTethysApp(result);
          }, 3000);
        },
        (error) => {
          setIsLoaded(true);
          console.error(error);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return (
      <div>Error: {error.message}</div>
    );
  } else if (!isLoaded) {
    return (
      <LoadingPage />
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
