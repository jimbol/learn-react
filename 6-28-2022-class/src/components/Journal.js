import { Button, Container, Typography } from "@mui/material";
import Entry from "./Entry";
import AddEntry from './AddEntry';
import useEntries from "../hooks/useEntries";

const Journal = () => {
  const {
    save,
    loading,
    entries,
    setEntries,
  } = useEntries();

  return (
    <Container>
      <Typography variant="h1">Journal</Typography>
      {
        loading ? (<span>Loading...</span>) : null
      }
      <AddEntry save={save} />
      <div>
        {
          entries.map((entry) => {
            return (<Entry key={entry.id} entry={entry} />);
          })
        }
      </div>
      <Button
        onClick={() => setEntries([])}
      >
        Clear Journal
      </Button>
    </Container>
  );
};

export default Journal;
