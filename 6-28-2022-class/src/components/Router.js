import { Routes, Route } from 'react-router-dom';
import Journal from './Journal';
import JournalClass from './JournalClass';
import JournalContainerClass from './JournalContainerClass';
import About from './About';
import { Container } from '@mui/system';
import { Typography } from '@mui/material';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Journal />} />
      <Route path="/journal-class" element={<JournalClass />} />
      <Route path="/journal-container-class" element={<JournalContainerClass />} />
      <Route path="/about" element={<About />} />
      <Route
        path="*"
        element={
          <Container>
            <Typography variant="h2">That page doesn't exist</Typography>
          </Container>
        }
      />
    </Routes>
  );
};

export default Router;
