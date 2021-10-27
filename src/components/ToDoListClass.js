import React from "react";
// const ToDoList = () => {}
export default class ToDoList extends React.Component {
  state = {
    toDos: [],
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  setToDos(toDos) {
    this.setState((state) => {
      // props are the arguments passed into the component
      // state is what we define above
      return ({
        ...state,
        toDos,
      });
    })
  }

  // componentDidUpdate() {}
  componentDidMount() {
    console.log('Call useEffect');
    fetch('http://localhost:5000')
    .then(response => response.json())
    // .then((result) => this.setState({ toDos: result.data }));
    .then((result) => this.setToDos(result.data));
  }

  render() {
    return (
      <section>
        <h2>Test</h2>
      </section>
    );
  }
}
