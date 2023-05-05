import { Button, Container, MenuItem, Select, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { v4 as uuid } from 'uuid';

const MOODS = [
  "Neutral",
  "Happy",
  "Excited",
  "Sad",
  "Mad",
];

const AddEntry = ({ addEntry }) => {
  const [text, setText] = useState('');
  const [selectedMood, setSelectedMood] = useState('Neutral');

  const updateText = useCallback((event) => {
    setText(event.target.value || '');
  }, [setText]);

  const updateSelectedMood = useCallback((event) => {
    setSelectedMood(event.target.value || '');
  }, [setSelectedMood]);

  const saveEntry = useCallback(() => {
    addEntry({
      id: uuid(),
      text,
      mood: selectedMood,
      open: true,
      date: new Date(),
    });
    setText('');
    setSelectedMood('Neutral');
  }, [addEntry, text, selectedMood]);

  return (
    <Container>
      <TextField
        placeholder="New Journal Entry"
        value={text}
        onChange={updateText}
      />
      <Select
        value={selectedMood}
        onChange={updateSelectedMood}
      >
        {
          MOODS.map(mood => (
            <MenuItem key={mood} value={mood}>{mood}</MenuItem>
          ))
        }
      </Select>
      <Button
        onClick={saveEntry}
      >Save</Button>
    </Container>
  );
};

export default AddEntry;
