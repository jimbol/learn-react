import { Container } from "@mui/material";

const Journal = () => {
  return (
    <Container>
      <input type="text" placeholder="Your journal entry"/>
      <ul>
        <li>Took a walk</li>
        <li>Read for 1 hour</li>
      </ul>
    </Container>
  );
};

export default Journal;
