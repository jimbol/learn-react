import { useState, useCallback, useEffect } from 'react';
import { Button, TextField } from '@mui/material';

import { v4 as getUuid } from 'uuid';

import ToDoListItem from './ToDoListItem';

const useToDoState = () => {
  const [dataHasLoaded, setDataHasLoaded] = useState(false);

  const defaultToDos = [];

  const [toDos, setToDosState] = useState(defaultToDos);

  useEffect(() => {
    if (!dataHasLoaded) {
      fetch('http://localhost:5000')
        .then((response) => response.json())
        .then((resultObj) => {
          setDataHasLoaded(true);
          setToDosState(resultObj.data);
        })
    }
  }, [
    dataHasLoaded,
    setDataHasLoaded,
    setToDosState,
  ]);

  return {
    toDos,
    setToDosState,
    dataHasLoaded
  };
}

const ToDoList = () => {
  const [textValue, setTextValue] = useState('');

  const {
    toDos,
    setToDosState,
    dataHasLoaded
  } = useToDoState();

  const toggleToDo = useCallback((toDoUuid) => {
    const newToDosList = toDos.map((toDo) => {
      if (toDo.id !== toDoUuid) return toDo;

      const updatedToDo = {
        ...toDo,
        done: !toDo.done,
      };

      return updatedToDo;
    });

    setToDosState(newToDosList);
  }, [
    toDos,
    setToDosState,
  ]);

  if (!dataHasLoaded) {
    return <h3>Loading...</h3>
  }

  return (
    <div>
      <div>
        <TextField
          value={textValue}
          placeholder="New to do"
          onChange={(event) => {
            setTextValue(event.target.value)
          }}
        />
        <Button
          onClick={() => {
            const newToDosList = [...toDos];
            newToDosList.push({
              id: getUuid(),
              label: textValue,
              done: false,
            });

            setToDosState(newToDosList)
            setTextValue('');
          }}
        >Add</Button>
      </div>

      <ul>
        {
          toDos.map((toDo) => (
            <ToDoListItem
              key={toDo.id}
              toDo={toDo}
              toggleToDo={toggleToDo}
            />
          ))
        }
      </ul>
    </div>
  );
}

export default ToDoList;
