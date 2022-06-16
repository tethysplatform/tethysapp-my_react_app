import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import LoadingAnimation from 'components/loader/LoadingAnimation';
import { CsrfContext, TethysAppContext, UserContext } from 'components/context';

const TETHYS_APP = process.env.TETHYS_APP;
const TETHYS_APP_URL = TETHYS_APP.replaceAll('_', '-');
const TETHYS_HOST = process.env.TETHYS_HOST;
const TETHYS_LOADER_DELAY = process.env.TETHYS_LOADER_DELAY;


function Loader({children}) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tethysApp, setTethysApp] = useState({});
  const [user, setUser] = useState({});
  const [csrf, setCSRF] = useState(null);

  useEffect(() => {
    const handleError = (error) => {
      // Delay setting the error to avoid flashing the loading animation
      setTimeout(() => {
        setError(error);
      }, TETHYS_LOADER_DELAY);
    };
  
    const getSession = () => {
      return fetch(`${TETHYS_HOST}/api/session/`, {
        credentials: "include",
      })
      .then((response) => response.json())
      .then((data) => {
        if (!data.isAuthenticated) {
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
    
    // Get the session first
    getSession()
      .then(() => {
        // Then load all other app data
        const appDataPromise = getAppData();
        const userDataPromise = getUserData();
        const csrfPromise = getCSRF();
        Promise.all([appDataPromise, userDataPromise, csrfPromise])
          .then(() => setTimeout(() => {setIsLoaded(true)}, TETHYS_LOADER_DELAY))
          .catch((error) => handleError(error));
      });
  }, []);

  if (error) {
    // Throw error so it will be caught by the ErrorBoundary
    throw error;
  } else if (!isLoaded) {
    return (
      <LoadingAnimation />
    );
  } else {
    return (
      <>
        <CsrfContext.Provider value={csrf}>
          <TethysAppContext.Provider value={tethysApp}>
            <UserContext.Provider value={user}>
              {children}
            </UserContext.Provider>
          </TethysAppContext.Provider>
        </CsrfContext.Provider>
      </>
    );
  }
}

Loader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

export default Loader;
