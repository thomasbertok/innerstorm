import React from "react";
import PropTypes from "prop-types";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    if (typeof this.props.onError === "function") {
      this.props.onError({ error, info });
    }
    console.error(error, info);
  }

  reset = () => {
    this.setState({ hasError: false, error: null, info: null });
    if (typeof this.props.onReset === "function") this.props.onReset();
  };

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;
      if (fallback) {
        return typeof fallback === "function" ? fallback({ error: this.state.error, reset: this.reset }) : fallback;
      }
      return (
        <div style={{ padding: 24 }}>
          <h2>Oh Snap!</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {String(this.state.error)}
            <br />
            {this.state.info?.componentStack}
          </details>
          <button onClick={this.reset} style={{ marginTop: 12 }}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onError: PropTypes.func,
  onReset: PropTypes.func,
};

ErrorBoundary.defaultProps = {
  fallback: null,
  onError: null,
  onReset: null,
};

// Usage example:
// <ErrorBoundary fallback={<div>Something went wrong.</div>} onError={(err) => console.error(err)}>
//   <MyComponent />
// </ErrorBoundary>
