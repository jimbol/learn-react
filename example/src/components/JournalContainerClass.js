import { Container, Typography } from '@mui/material';
import React from "react";

import AddEntry from './AddEntry';
import Entry from './Entry';

class JournalContainer extends React.Component {
  state = {
    entries: [],
    isLoading: false,
  }

  setIsLoading(isLoading) {
    this.setState({ isLoading });
  }

  setEntries(entries) {
    this.setState({ entries });
  }

  // componentDidUpdate() {}
  componentDidMount() {
    this.setIsLoading(true);
    fetch('http://localhost:5000/entries')
      .then(response => response.json())
      .then((result) => {
        this.setEntries(result.data);
        this.setIsLoading(false);
      });
  }

  save(newEntry) {
    this.setEntries([
      newEntry,
      ...this.state.entries,
    ]);
    this.setIsLoading(true);

    fetch('http://localhost:5000/entry', {
      method: 'post',
      body: JSON.stringify({
        entry: newEntry,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then((result) => {
        this.setEntries(result.data);
        this.setIsLoading(false);
      });
  }

  update(entryChanges) {
    const originalEntryIndex = this.state.entries.findIndex(({ id }) => entryChanges.id === id);

    const newEntry = {
      ...this.state.entries[originalEntryIndex],
      ...entryChanges,
    };

    const updatedEntries = [
      ...this.state.entries,
    ];

    updatedEntries[originalEntryIndex] = newEntry;
    this.setEntries(updatedEntries);
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          save: this.save.bind(this),
          entries: this.state.entries,
          isLoading: this.state.isLoading,
          updateEntry: this.update.bind(this),
        });
      }
      return child;
    });

    return (
      <>{childrenWithProps}</>
    );
  }
}

const Journal = ({ save, isLoading, entries, updateEntry }) => {
  return (
    <Container>
      <Typography variant="h1">Journal</Typography>
      <AddEntry save={save} />
      {
        isLoading ? (<Typography variant="body1">Loading...</Typography>) : null
      }
      {
        entries.map(entry => (
          <Entry
            key={entry.id}
            entry={entry}
            updateEntry={updateEntry}
          />
        ))
      }
    </Container>
  );
}

const HomePage = () => {
  return (
    <JournalContainer>
      <Journal />
    </JournalContainer>
  );
}

export default HomePage;
