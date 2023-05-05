import React from 'react';
import { Container, Typography } from '@mui/material';
import AddEntry from './AddEntry';
import Entry from './Entry';

export default class JournalClass extends React.Component {
  state = {
    journalEntries: [],
    loading: false,
  }

  setJournalEntries(journalEntries) {
    this.setState({
      journalEntries,
    })
  }

  setLoading(value) {
    this.setState({
      loading: value,
    })
  }

  save(newEntry) {
    this.setJournalEntries([
      newEntry,
      ...this.state.journalEntries,
    ]);
    this.setLoading(true);

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
        this.setJournalEntries(result.data);
        this.setLoading(false);
      });
  }

  update(entryChanges) {
    const originalEntryIndex = this.state.journalEntries.findIndex(({ id }) => entryChanges.id === id);

    const updatedEntry = {
      ...this.state.journalEntries[originalEntryIndex],
      ...entryChanges,
    };

    const updatedEntries = [
      ...this.state.journalEntries,
    ];

    updatedEntries[originalEntryIndex] = updatedEntry;
    this.setJournalEntries(updatedEntries)
  }

  componentDidMount() {
    this.setLoading(true);
    fetch('http://localhost:5000/entries')
      .then(response => response.json())
      .then((result) => {
        this.setJournalEntries(result.data);
        this.setLoading(false);
      });
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    return (
      <Container>
        <Typography variant="h1">Journal</Typography>
        <AddEntry save={this.save.bind(this)} />
        {
          this.state.loading ? <Typography variant="h5">Loading...</Typography> : null
        }
        {
          this.state.journalEntries.map((entry, index) => (
            <Entry
              key={entry.id}
              entry={entry}
              index={index}
              update={this.update.bind(this)}
            />
          ))
        }
      </Container>
    );
  }
}
