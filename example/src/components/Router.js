import { Container, Typography } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Journal from './Journal';
import JournalClass from './JournalClass';
import HomePage from './JournalContainerClass';
import About from './About';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Journal />} />
      <Route path="/about" element={<About />} />
      <Route path="/containerclass" element={<HomePage />} />
      <Route path="/class" element={<JournalClass />} />
      <Route
        path="*"
        element={
          <Container>
            <Typography variant="h2">There's nothing here.</Typography>
          </Container>
        }
      />
    </Routes>
  );
}

export default Router;
