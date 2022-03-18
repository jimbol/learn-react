import { Container, Typography } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Journal from './Journal';
import About from './About';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Journal />} />
      <Route path="/about" element={<About />} />
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
