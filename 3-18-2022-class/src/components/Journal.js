import { Container, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';
import Entry from './Entry';

const entries = [{
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
   return (
     <Container>
       <Typography variant="h1">Journal</Typography>
       {
         entries.map((entry) => (
          <Entry key={entry.id} entry={entry} />
         ))
       }
     </Container>
   );
};

export default Journal;
