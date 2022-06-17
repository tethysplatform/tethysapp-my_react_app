import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import tethysAPI from 'services/api/tethys';
import LoadingAnimation from 'components/loader/LoadingAnimation';
import { AppContext } from 'components/context';

const TETHYS_APP = process.env.TETHYS_APP;
const TETHYS_APP_URL = TETHYS_APP.replaceAll('_', '-');
const TETHYS_LOADER_DELAY = process.env.TETHYS_LOADER_DELAY;

function Loader({children}) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [appContext, setAppContext] = useState(null);
 
  const handleError = (error) => {
    // Delay setting the error to avoid flashing the loading animation
    setTimeout(() => {
      setError(error);
    }, TETHYS_LOADER_DELAY);
  };

  useEffect(() => {  
    // Get the session first
    tethysAPI.getSession()
      .then(() => {
        // Then load all other app data
        Promise.all([
            tethysAPI.getAppData(TETHYS_APP_URL), 
            tethysAPI.getUserData(), 
            tethysAPI.getCSRF(),
          ])
          .then(([tethysApp, user, csrf]) => {
            // Update app context
            setAppContext({tethysApp, user, csrf});

            // Allow for minimum delay to display loader
            setTimeout(() => {
              setIsLoaded(true)
            }, TETHYS_LOADER_DELAY);
          })
          .catch(handleError);
      }).catch(handleError);
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
        <AppContext.Provider value={appContext}>
          {children}
        </AppContext.Provider>
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
