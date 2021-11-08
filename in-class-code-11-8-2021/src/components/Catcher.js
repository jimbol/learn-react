import React from 'react';

export default class Catcher extends React.Component {
  state = {
    error: false,
  }

  componentDidCatch(e) {
    console.log(`${this.props.scope} had an error`);
    console.log(e);
    this.setState((state) => ({
      ...state,
      error: true,
    }));
  }

  render() {
    const {
      error,
    } = this.state;


    if (error) {
      return <h3>There was an error.</h3>
    }

    return this.props.children;
  }
}
