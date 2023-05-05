import { Container, Typography } from '@mui/material';
import useJournalEntries from '../hooks/useJournalEntries';
import AddEntry from './AddEntry';
import Entry from './Entry';

function Journal() {
  const { save, loading, update, journalEntries } = useJournalEntries();

  return (
    <Container>
      <Typography variant="h1">Journal</Typography>
      <AddEntry save={save} />
      {
        loading ? <Typography variant="h5">Loading...</Typography> : null
      }
      {
        journalEntries.map((entry, index) => (
          <Entry
            key={entry.id}
            entry={entry}
            index={index}
            update={update}
          />
        ))
      }
    </Container>
  );
};

export default Journal;
