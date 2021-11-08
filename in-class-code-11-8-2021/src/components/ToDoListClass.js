import React from 'react';
import { v4 as getUuid } from 'uuid';
import ToDoListItem from './ToDoListItem';

export default class TodoList extends React.Component {
  state = {
    toDos: [],
    dataHasLoaded: false,
    textValue: '',
    error: false,
  }

  componentDidMount() {
    if (!this.dataHasLoaded) {
      fetch('http://localhost:5000')
        .then((response) => response.json())
        .then((resultObj) => {
          this.setDataHasLoaded(true);
          this.setToDosState(resultObj.data);
        })
    }
  }

  componentDidCatch(e) {
    console.log(e);

    this.setState((state) => ({
      ...state,
      error: true,
    }));
  }

  setTextValue(textValue) {
    this.setState((state) => {
      return {
        ...state,
        textValue
      };
    });
  }

  setDataHasLoaded(dataHasLoaded) {
    this.setState((state) => {
      return {
        ...state,
        dataHasLoaded
      };
    });
  }

  setToDosState(toDos) {
    this.setState((state) => {
      return {
        ...state,
        toDos,
      };
    });
  }

  toggleToDo(toDoUuid) {
    const { toDos } = this.state;

    const newToDosList = toDos.map((toDo) => {
      if (toDo.id !== toDoUuid) return toDo;

      const updatedToDo = {
        ...toDo,
        done: !toDo.done,
      };

      return updatedToDo;
    });

    this.setToDosState(newToDosList);
  }

  render() {
    const {
      textValue,
      toDos,
      dataHasLoaded,
      error,
    } = this.state;

    if (!dataHasLoaded) {
      return <h3>Loading...</h3>
    }

    if (error) {
      return <h3>There was an error.</h3>
    }

    return (
      <div>
        <div>
          <input
            value={textValue}
            type="text"
            placeholder="New to do"
            onChange={(event) => {
              this.setTextValue(event.target.value)
            }}
          />
          <button
            onClick={() => {
              const newToDosList = [...toDos];
              newToDosList.push({
                id: getUuid(),
                label: textValue,
                done: false,
              });

              this.setToDosState(newToDosList)
              this.setTextValue('');
            }}
          >Add</button>
        </div>

        <ul>
          {
            toDos.map((toDo) => (
              <ToDoListItem
                key={toDo.id}
                toDo={toDo}
                toggleToDo={this.toggleToDo.bind(this)}
              />
            ))
          }
        </ul>
      </div>
    );
  }
}

