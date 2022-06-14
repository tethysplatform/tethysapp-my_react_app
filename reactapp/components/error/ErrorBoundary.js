import PropTypes from 'prop-types';
import React from "react";

import PrettyError from "./PrettyError";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null, 
      errorInfo: null,
      hasError: false
    };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
      hasError: true
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const TETHYS_DEBUG = process.env.TETHYS_DEBUG === 'true';
    if (this.state.hasError) {
      if (!TETHYS_DEBUG) {
        return (
          <PrettyError />
        );
      } else {
        return (
          <div>
            <h2>Something went wrongsies. ({ TETHYS_DEBUG })</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        );
      }
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

export default ErrorBoundary;