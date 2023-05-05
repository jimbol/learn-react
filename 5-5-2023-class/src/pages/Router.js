import { Route, Routes } from "react-router-dom";
import Journal from "./Journal";
import JournalWithContainer from "./JournalWithContainer";
import GetEntries from "../components/GetEntries";
import JournalClass from "./JournalClass";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Journal />} />
      <Route path="/journal-class" element={<JournalClass />} />
      <Route path="/journal-with-container" element={(
        <GetEntries>
          <JournalWithContainer />
        </GetEntries>
      )} />
      <Route path="/about" element={<h2>About Quick Jot</h2>} />
      <Route
        path="*"
        element={<h2>Page not found</h2>}
      />
    </Routes>
  );
};

export default Router;
