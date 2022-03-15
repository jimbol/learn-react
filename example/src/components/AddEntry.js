import { TextField, Select, MenuItem, Container, Button } from '@mui/material';
import { useCallback, useState } from "react";
import { v4 as uuid } from 'uuid';

const MOODS = ['neutral', 'happy', 'sad', 'excited', 'worried'];

const AddEntry = ({ save }) => {
  const [mood, setMood] = useState('neutral');
  const [text, setText] = useState('');

  const updateText = useCallback((e) => {
    setText(e.target.value || '');
  }, [setText]);

  const updateEmotion = useCallback((e) => {
    setMood(e.target.value || '');
  }, [setMood]);

  const saveEntry = useCallback(() => {
    save({
      id: uuid(),
      text,
      mood,
      date: (new Date()).toLocaleDateString("en-US"),
      open: true,
    });
    setMood('neutral');
    setText('');
  }, [mood, text, save]);

  return (
    <Container>
      <TextField
        style={{ maxWidth: 460, width: '100%' }}
        placeholder="Journal Entry"
        value={text}
        onChange={updateText}
      />
      <Select
        value={mood}
        label="Mood"
        onChange={updateEmotion}
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
};

export default AddEntry;
