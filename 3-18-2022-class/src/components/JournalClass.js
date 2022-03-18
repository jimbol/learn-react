import React from 'react';
import { Container, Typography } from '@mui/material';
import Entry from './Entry';
import AddEntry from './AddEntry';

export default class Journal extends React.Component {
  state = {
    entries: [],
    isLoading: false,
  }

  setIsLoading(isLoading) {
    this.setState({ isLoading })
  }

  setEntries(entries) {
    this.setState({ entries })
  }

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
      body: JSON.stringify({ entry: newEntry }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then((result) => {
        this.setEntries(result.data);
        this.setIsLoading(false);
      });
  }

  update(entryChanges) {
    const { entries } = this.state;
    const originalEntryIndex = entries.findIndex(({ id }) => id === entryChanges.id);
    const newEntry = {
      ...entries[originalEntryIndex],
      ...entryChanges,
    };

    const updatedEntries = [
      ...entries,
    ];

    updatedEntries[originalEntryIndex] = newEntry;
    this.setEntries(updatedEntries);
  }


  render() {
    const { entries, isLoading } = this.state;
    return (
      <Container>
        <Typography variant="h1">Journal</Typography>
        <AddEntry save={this.save.bind(this)}/>
        {
          isLoading ? (<p>Loading...</p>) : null
        }
        {
          entries.map((entry) => (
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
