import { Container } from "@mui/material";
import AddEntry from "../components/AddEntry";
import Entry from "../components/Entry";
import useEntries from "../hooks/useEntries";

const Journal = () => {
  const {
    loading,
    toggleOpen,
    addEntry,
    entries,
  } = useEntries();

  if (loading) {
    return (
      <Container>Loading...</Container>
    );
  }

  return (
    <Container>
      <AddEntry addEntry={addEntry} />

      {
        entries.map(entry => (
          <Entry
            toggleOpen={toggleOpen}
            key={entry.id}
            id={entry.id}
            text={entry.text}
            mood={entry.mood}
            date={entry.date}
            open={entry.open}
          />
        ))
      }
    </Container>
  );
};

export default Journal;
