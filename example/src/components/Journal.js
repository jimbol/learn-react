import { Container, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import AddEntry from './AddEntry';
import Entry from './Entry';

const defaultEntries = [{
  id: uuid(),
  mood: 'smile',
  text: 'I felt good about teaching today',
  date: (new Date()).toLocaleDateString("en-US"),
  open: true,
}, {
  id: uuid(),
  mood: 'sad',
  text: 'Current events have been bringing me down',
  date: (new Date()).toLocaleDateString("en-US"),
  open: false,
}];

const useEntries = () => {
  const [entries, setEntries] = useState(defaultEntries);
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialized) return;
    setInitialized(true);
    setIsLoading(true);
    fetch('http://localhost:5000/entries')
      .then(response => response.json())
      .then((result) => {
        setEntries(result.data);
        setIsLoading(false);
      });
  }, [setEntries, initialized, setInitialized]);

  const save = useCallback((newEntry) => {
    setEntries([
      newEntry,
      ...entries,
    ]);
    setIsLoading(true);

    fetch('http://localhost:5000/entry', {
      method: 'post',
      body: JSON.stringify({
        entry: newEntry,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then((result) => {
        setEntries(result.data);
        setIsLoading(false);
      });
  }, [entries, setEntries, setIsLoading]);

  const update = useCallback((entryChanges) => {
    const originalEntryIndex = entries.findIndex(({ id }) => entryChanges.id === id);

    const newEntry = {
      ...entries[originalEntryIndex],
      ...entryChanges,
    };

    const updatedEntries = [
      ...entries,
    ];

    updatedEntries[originalEntryIndex] = newEntry;
    setEntries(updatedEntries);
  }, [entries, setEntries]);

  return {
    update,
    save,
    isLoading,
    data: entries,
  }
}

const Journal = () => {
  const entries = useEntries();

  return (
    <Container>
      <Typography variant="h1">Journal</Typography>
      <AddEntry save={entries.save} />
      {
        entries.isLoading ? (<Typography variant="body1">Loading...</Typography>) : null
      }
      {
        entries.data.map(entry => (
          <Entry
            key={entry.id}
            entry={entry}
            updateEntry={entries.updateEntry}
          />
        ))
      }
    </Container>
  );
};

export default Journal;
