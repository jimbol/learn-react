import { Container, Typography } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Journal from './Journal';
import JournalClass from './JournalClass';
import About from './About';
import HomePage from './JournalContainer';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Journal />} />
      <Route path="/about" element={<About />} />
      <Route path="/class" element={<JournalClass />} />
      <Route path="/container" element={<HomePage />} />
      {/* <Route path="/entry/:id" element={<Entry />} /> */}
      <Route
        path="*"
        element={
          <Container>
            <Typography variant="h2">There is nothing here.</Typography>
          </Container>
        }
      />
    </Routes>
  );
};

export default Router;
