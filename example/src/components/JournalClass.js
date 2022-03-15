import { Container, Typography } from '@mui/material';
import React from "react";

import AddEntry from './AddEntry';
import Entry from './Entry';

export default class Journal extends React.Component {
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
    // props can be accessed as this.props
    return (
      <Container>
        <Typography variant="h1">Journal</Typography>
        <AddEntry save={this.save.bind(this)} />
        {
          this.state.isLoading ? (<Typography variant="body1">Loading...</Typography>) : null
        }
        {
          this.state.entries.map(entry => (
            <Entry
              key={entry.id}
              entry={entry}
              updateEntry={this.update.bind(this)}
            />
          ))
        }
      </Container>
    );
  }
}
