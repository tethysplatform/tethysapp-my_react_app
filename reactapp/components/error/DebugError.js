import Alert from 'react-bootstrap/Alert';
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import { useEffect } from 'react';


const DebugError = ({ error, errorInfo }) => {
  const languageName = 'component-stack';

  useEffect(() => {
    // Defome a custom Prism language for component stack highlighting
    Prism.languages['component-stack'] = {
      'doc-link': {
        pattern: /[a-z]+:\/\/[\w-/.]+/,
        alias: 'url',
      },
      'line-col': {
        pattern: /[0-9]+/,
        alias: 'number',
      },
      'component': {
        pattern: /[^(at\s)]([\w]+){1}[^\s]/,
        alias: 'class-name',
      },
    };

    // Enable highlighting
    Prism.highlightAll();
  }, []);

  return (
    <div className="d-flex flex-column h-100 bg-light">
      <main className="flex-shrink-0">
        <div className="px-4 py-2 border-bottom" style={{ backgroundColor: "#fff3cd" }}>
          <h1 className="text-secondary">{error && error.toString()}</h1>
        </div>
        <div className="px-4 py-2" >
          <h4>Component Stack</h4>
          <pre className="rounded">
            <code className={`language-${languageName}`}>
              {errorInfo.componentStack.replace('\n', '')}
            </code>
          </pre>
        </div>
        <div className="px-4 py-2" >
          <Alert variant="info">
            <Alert.Heading>Tip</Alert.Heading>
            <p>Use the <b>React Developer Tools</b> extension for your browser to debug this error:</p>
            <ul>
              <li>
                <a 
                  href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React Developer Tools Chrome Extension
                </a>
              </li>
              <li>
                <a 
                  href="https://addons.mozilla.org/en-US/firefox/addon/react-devtools/" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React Developer Tools Firefox Add-on
                </a>
              </li>
              <li>
                <a 
                  href="https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  React Developer Tools Microsoft Edge Add-on
                </a>
              </li>
            </ul>
          </Alert>
        </div>
      </main>
      <footer className="mt-auto">
        <Alert variant="secondary" className="mb-0"><b>Important!</b> You&apos;re seeing this error because you have <code>TETHYS_DEBUG = true</code> in your <code>.env</code> file. Change that to <code>false</code> to display the standard error message page.</Alert>
      </footer>
    </div>
  );
};

DebugError.propTypes = {
  error: PropTypes.string,
  errorInfo: PropTypes.shape({
    componentStack: PropTypes.string,
  }),
};

export default DebugError;