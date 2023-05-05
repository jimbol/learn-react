import { Button, Container, MenuItem, Select, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { v4 as uuid } from 'uuid';

const MOODS = ['neutral', 'happy', 'sad', 'excited', 'worried'];

function AddEntry ({ save }) {
  const [text, setText] = useState('');
  const [mood, setMood] = useState('neutral');

  const updateText = useCallback((event) => setText(event.target.value || ''), [setText]);
  const updateMood = useCallback((event) => setMood(event.target.value || ''), [setMood]);
  const saveEntry = useCallback(() => {
    save({
      id: uuid(),
      text,
      mood,
      date: (new Date()).toLocaleDateString('en-US'),
      open: true,
    });
    setText('');
    setMood('neutral');
  }, [text, save, mood]);

  return (
    <Container>
      <TextField
        style={{ maxWidth: 460, width: '100%' }}
        placeholder="New Journal Entry"
        value={text}
        onChange={updateText}
      />
      <Select
        value={mood}
        label="Mood"
        onChange={updateMood}
      >
        {
          MOODS.map((emotionOption) => (
            <MenuItem key={emotionOption} value={emotionOption}>{emotionOption}</MenuItem>
          ))
        }
      </Select>
      <br />
      <Button onClick={saveEntry}>
        Save
      </Button>
    </Container>
  );
}

export default AddEntry;
