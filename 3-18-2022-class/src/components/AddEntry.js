import { TextField, Select, MenuItem, Container, Button } from "@mui/material";
import { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

const MOODS = ['neutral', 'happy', 'sad', 'excited', 'worried'];

const AddEntry = ({ save }) => {
  const [text, setText] = useState('');
  const [mood, setMood] = useState('neutral');

  const updateText = useCallback((event) => {
    setText(event.target.value || '');
  }, [setText]);

  const updateMood = useCallback((event) => {
    setMood(event.target.value || '');
  }, [setMood]);

  return (
    <Container>
      <TextField
        style={{ maxWidth: 460, width: '100%' }}
        placeholder="Journal Entry"
        value={text}
        onChange={updateText}
      />
      <Select
        label="Mood"
        onChange={updateMood}
        value={mood}
      >
        {
          MOODS.map((moodOption) => (
            <MenuItem key={moodOption} value={moodOption}>{moodOption}</MenuItem>
          ))
        }
      </Select>
      <br />
      <Button
        // onClick={saveEntry}
      >
        Save
      </Button>
    </Container>
  );
};
export default AddEntry;
