import { Container, Typography } from '@mui/material';
import Entry from './Entry';
import AddEntry from './AddEntry';
import { useEntries } from '../hooks/use-entries';

const Journal = () => {
  const entries = useEntries();
  return (
    <Container>
      <Typography variant="h1">Journal</Typography>
      <AddEntry save={entries.save}/>
      {
        entries.isLoading ? (<p>Loading...</p>) : null
      }
      {
        entries.data.map((entry) => (
        <Entry
          key={entry.id}
          entry={entry}
          updateEntry={entries.update}
        />
        ))
      }
    </Container>
  );
};

export default Journal;
