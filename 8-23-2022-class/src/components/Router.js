import { Typography, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Journal from "./Journal";
import JournalClass from "./JournalClass";
import HomePage from "./JournalContainerClass";

function Router () {
  return (
    <Routes>
      <Route path="/" element={<Journal />} />
      <Route path="/about" element={<h2>About</h2>} />
      <Route path="/journal-class" element={<JournalClass />} />
      <Route path="/journal-container-class" element={<HomePage />} />
      <Route
        path="*"
        element={
          <Container>
            <Typography variant="h2">There's nothing here!</Typography>
          </Container>
        }
      />
    </Routes>
  );
}

export default Router;
