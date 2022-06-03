import './App.css';
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Content from './Content';
import Header from './Header';
import LoadingPage from './Loading';
import Menu from './Menu';
import Error from './Error';


function App() {
  const [showError, setShowError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tethysApp, setTethysApp] = useState({});
  const [navVisible, setNavVisible] = useState(false);
  const [user, setUser] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [isAuthenticated, setAuthenticated] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [csrf, setCSRF] = useState(null);

  useEffect(() => {
    const TETHYS_APP = process.env.TETHYS_APP;
    const TETHYS_APP_URL = TETHYS_APP.replace('_', '-');
    const TETHYS_HOST = process.env.TETHYS_HOST;
    const LOADING_DELAY = process.env.LOADING_DELAY;

    const handleError = (error) => {
      if (process.env.DEBUG) {
        console.log(error);
      }
      setTimeout(() => {
        setShowError(true);
        setIsLoaded(true);
      }, LOADING_DELAY);
    };
  
    const getSession = () => {
      return fetch(`${TETHYS_HOST}/api/session/`, {
        credentials: "include",
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.isAuthenticated) {
          setAuthenticated(true);
        } else {
          // Redirect to Tethys login
          location.href = `${TETHYS_HOST}/accounts/login?next=${location.pathname}`;
        }
      })
      .catch((error) => handleError(error));
    };
  
    const getCSRF = () => {
      return fetch(`${TETHYS_HOST}/api/csrf/`, {
        credentials: "include",
      })
      .then((response) => {
        let csrfToken = response.headers.get("X-CSRFToken");
        setCSRF(csrfToken);
      })
      .catch((error) => handleError(error));
    };
  
    const getUserData = () => {
      return fetch(`${TETHYS_HOST}/api/whoami/`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        console.log("You are logged in as: " + data.username);
      })
      .catch((error) => handleError(error));
    };
  
    const getAppData = () => {
      return fetch(`${TETHYS_HOST}/api/apps/${TETHYS_APP_URL}/`)
        .then(response => response.json())
        .then((data) => {
          setTethysApp(data);
        })
        .catch((error) => handleError(error));
    };
    
    const initApp = () => {
      // Get the session first
      getSession()
        .then(() => {
          // Then load all other app data
          const appDataPromise = getAppData();
          const userDataPromise = getUserData();
          const csrfPromise = getCSRF();
          Promise.all([appDataPromise, userDataPromise, csrfPromise])
            .then(() => {
              setTimeout(() => {
                setIsLoaded(true);
              }, LOADING_DELAY);
            })
            .catch((error) => handleError(error));
        });
    };

    // Kick-off app initialization
    initApp();
  }, []);

  if (showError) {
    return (
      <Error />
    );
  } else if (!isLoaded) {
    return (
      <LoadingPage />
    );
  } else {
    return (
      <div className="App">
        <Header tethysApp={tethysApp} user={user} onNavChange={setNavVisible} />
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
