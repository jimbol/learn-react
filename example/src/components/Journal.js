import { Container, Typography } from '@mui/material';
import { useCallback } from 'react';
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

const Journal = () => {
  const [entries, setEntries] = useState(defaultEntries);

  const save = useCallback((newEntry) => {
    setEntries([
      newEntry,
      ...entries,
    ]);
  }, [entries, setEntries]);

  const updateEntry = useCallback((entryChanges) => {
    const originalEntryIndex = entries.findIndex(({ id }) => entryChanges.id === id);

    const newEntry = {
      ...entries[originalEntryIndex],
      ...entryChanges,
    };

    const updatedEntries = [
      ...entries,
    ];
    updatedEntries[originalEntryIndex] = newEntry;
    console.log(updatedEntries);
    setEntries(updatedEntries);
  }, [entries, setEntries]);

  return (
    <Container>
      <Typography variant="h1">Journal</Typography>

      <AddEntry save={save} />
      {
        entries.map(entry => (
          <Entry
            key={entry.text}
            entry={entry}
            updateEntry={updateEntry}
          />
        ))
      }
    </Container>
  );
};

export default Journal;
