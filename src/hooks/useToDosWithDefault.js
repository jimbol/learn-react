import { useState, useEffect } from 'react';

// hooks start with the work 'use'
export const useToDosWithDefault = () => {
  const defaultToDos = [];

  const [toDos, setToDos] = useState(defaultToDos);

  useEffect(() => {
    fetch('http://localhost:5000')
      .then(response => response.json())
      .then((result) => setToDos(result.data));
  }, [setToDos]);

  return [toDos, setToDos];
};
