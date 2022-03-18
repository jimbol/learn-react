import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
    // send a message to Sentry or other error logger
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <p>Something went wrong.</p>
      );
    }

    return this.props.children;
  }
}
