import { useState } from 'react';
import styled from 'styled-components';
import { Button, TextField, Checkbox } from '@mui/material';
import {
  Link,
} from 'react-router-dom';

const AppTitle = styled.h2`
  padding: 4px;
  color: #888;
  background-color: #efefef;
  border-radius: 6px;
`;

const ToDoListItem = ({ i, toDo, toDos, setToDos }) => {
  const onCheck = (event, i) => {
    const newValue = event.target.value;
    const newToDos = [...toDos];
    newToDos[i] = {
      ...newToDos[i],
      done: newValue,
    };
    setToDos(newToDos);
  };

  return (
    <li className="to-do-li">
      <Checkbox
        checked={toDo.done}
        onChange={(event) => onCheck(event, i)}
      />

      <Link to={`/detail/${toDo.label}`}>{toDo.label}</Link>

      <Button
        size="small"
        onClick={() => setToDos(toDos.filter(({ label }) => label !== toDo.label))}
      >
        Delete
      </Button>
    </li>
  );
}

const ToDoList = ({
  toDos,
  setToDos,
}) => {

  const [newToDoText, setNewToDoText] = useState('');

  const onAddToDo = () => {
    setNewToDoText('');
    setToDos([
      ...toDos,
      {
        label: newToDoText,
        done: false,
      }
    ]);
  }

  return (
    <section>
      <AppTitle>To Do</AppTitle>
      <TextField
        value={newToDoText}
        onChange={(event) => setNewToDoText(event.target.value)}
        placeholder="Enter to-do text"
        onKeyDown={(event) => {
          if (event.key === 'Enter') onAddToDo();
        }}
        size="small"
      />

      <Button
        onClick={onAddToDo}
        size="large"
      >
        Add
      </Button>

      <ul>
        {toDos.map((toDo, i) => {
          if (toDo.deleted) return null;

          return (
            <ToDoListItem
              key={toDo.label}
              i={i}
              toDo={toDo}
              toDos={toDos}
              setToDos={setToDos}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default ToDoList;
