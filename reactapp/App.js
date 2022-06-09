import { useState, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';

import Error from './components/Error';
import Loader from './components/Loader';
import Header from './components/Header';
import NavMenu from './components/NavMenu';

import LearnReact from './views/learn/LearnReact';
import Home from './views/home/Home';

import './App.css';

const TETHYS_APP = process.env.TETHYS_APP;
const TETHYS_APP_URL = TETHYS_APP.replaceAll('_', '-');
const TETHYS_HOST = process.env.TETHYS_HOST;
const LOADER_DELAY = process.env.LOADER_DELAY;


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
    const handleError = (error) => {
      if (process.env.DEBUG) {
        console.log(error);
      }
      setTimeout(() => {
        setShowError(true);
        setIsLoaded(true);
      }, LOADER_DELAY);
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
          window.location.assign(`${TETHYS_HOST}/accounts/login?next=${window.location.pathname}`);
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
      .then((data) => setUser(data))
      .catch((error) => handleError(error));
    };
  
    const getAppData = () => {
      return fetch(`${TETHYS_HOST}/api/apps/${TETHYS_APP_URL}/`)
        .then(response => response.json())
        .then((data) => setTethysApp(data))
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
            .then(() => setTimeout(() => {setIsLoaded(true)}, LOADER_DELAY))
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
      <Loader />
    );
  } else {
    return (
      <>
        <HashRouter>
          <Header tethysApp={tethysApp} user={user} onNavChange={setNavVisible} />
          <NavMenu navTitle="Navigation"  navVisible={navVisible} onNavChange={setNavVisible}>
            <Nav variant="pills" defaultActiveKey={tethysApp.rootUrl} className="flex-column">
              <LinkContainer to="/">
                <Nav.Link eventKey="link-map">Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/learn-react">
                <Nav.Link eventKey="link-learn-react">Learn React</Nav.Link>
              </LinkContainer>
            </Nav>
          </NavMenu>
          <Routes>
            <Route path="/" element={
              <Home tethysApp={tethysApp} />
            }/>
            <Route path="/learn-react" element={
              <LearnReact tethysApp={tethysApp} />
            }/>
          </Routes>
        </HashRouter>
      </>
    );
  }
}

export default App;
