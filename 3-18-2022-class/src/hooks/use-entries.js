import { v4 as uuid } from 'uuid';
import { useState, useCallback, useEffect } from 'react';

const defaultEntries = [{
  id: uuid(),
  mood: 'happy',
  text: 'I feel good about teaching today',
  date: (new Date()).toLocaleDateString('en-US'),
  open: true,
}, {
  id: uuid(),
  mood: 'sad',
  text: 'Sad about world affairs',
  date: (new Date()).toLocaleDateString('en-US'),
  open: false,
}];

export const useEntries = () => {
  const [entries, setEntries] = useState(defaultEntries);
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialized)
      return;
    setInitialized(true);
    setIsLoading(true);

    fetch('http://localhost:5000/entries')
      .then(response => response.json())
      .then((result) => {
        setEntries(result.data);
        setIsLoading(false);
      });
  }, [setEntries, entries, initialized, setInitialized]);

  const save = useCallback((newEntry) => {
    setEntries([
      newEntry,
      ...entries,
    ]);
    setIsLoading(true);
    fetch('http://localhost:5000/entry', {
      method: 'post',
      body: JSON.stringify({ entry: newEntry }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then((result) => {
        setEntries(result.data);
        setIsLoading(false);
      });
  }, [entries, setEntries]);

  const update = useCallback((entryChanges) => {
    const originalEntryIndex = entries.findIndex(({ id }) => id === entryChanges.id);
    const newEntry = {
      ...entries[originalEntryIndex],
      ...entryChanges,
    };

    const updatedEntries = [
      ...entries,
    ];
    // 'foo' === 'bar'
    // a = {}
    // a.open = true
    // a === a
    updatedEntries[originalEntryIndex] = newEntry;
    setEntries(updatedEntries);
  }, [entries, setEntries]);

  return {
    save,
    update,
    isLoading,
    data: entries,
  };
};
