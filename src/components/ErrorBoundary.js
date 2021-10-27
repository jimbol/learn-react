import React from "react";

export default class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  }

  componentDidCatch(error, errorInfo) {
    // send to Sentry or other error tracking tool
    console.log(error, errorInfo);
  }

  static getDerivedStateFromError(error) {
    // Returns the state
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>Something went wrong.</h2>
      );
    }
    return this.props.children;
  }
}
