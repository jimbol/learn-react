import { useState, useCallback } from 'react';
import { Container, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';
import Entry from './Entry';
import AddEntry from './AddEntry';

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

const Journal = () => {
  const [entries, setEntries] = useState(defaultEntries);

  const save = useCallback((newEntry) => {
    setEntries([
      newEntry,
      ...entries,
    ]);
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

  return (
    <Container>
      <Typography variant="h1">Journal</Typography>
      <AddEntry save={save}/>
      {
        entries.map((entry) => (
        <Entry
          key={entry.id}
          entry={entry}
          updateEntry={update}
        />
        ))
      }
    </Container>
  );
};

export default Journal;
