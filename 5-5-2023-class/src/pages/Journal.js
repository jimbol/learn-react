import { useCallback, useState } from "react";
import { Container } from "@mui/material";
import AddEntry from "../components/AddEntry";
import Entry from "../components/Entry";

const DEFAULT_ENTRIES = [{
  id: 1,
  mood: 'Happy',
  text: 'I took a walk.',
  date: new Date(),
  open: true,
}, {
  id: 2,
  mood: 'Excited',
  text: 'Its almost weekend!',
  date: new Date(),
  open: false,
}];

const Journal = () => {
  const [entries, setEntries] = useState(DEFAULT_ENTRIES);

  const addEntry = useCallback((entry) => {
    setEntries([
      entry,
      ...entries,
    ]);
  }, [entries, setEntries]);

  const toggleOpen = useCallback((entryId) => {
    const newEntries = entries.map(entry => {
      if (entry.id === entryId) {
        entry.open = !entry.open;
      }
      return entry;
    });

    setEntries(newEntries);
  }, [entries, setEntries]);



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
