import React, { useState } from 'react';
// Manage to dos state

const ToDosStateContainer = ({ children }) => {
  const defaultToDos = [];
  const [toDos, setToDosState] = useState(defaultToDos);

  return (
    React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        toDos,
        setToDosState,
      });
    })
  );
}

export default ToDosStateContainer;
