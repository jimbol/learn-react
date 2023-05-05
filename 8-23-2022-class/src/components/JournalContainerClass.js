import React from 'react';
import { Container, Typography } from '@mui/material';
import AddEntry from './AddEntry';
import Entry from './Entry';

class JournalContainerClass extends React.Component {
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
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          save: this.save.bind(this),
          update: this.update.bind(this),
          loading: this.state.loading,
          journalEntries: this.state.journalEntries,
        });
      }
      return child;
    });

    return (
      <>{childrenWithProps}</>
    );
  }
}


const Journal = ({ save, loading, journalEntries, update }) => {
  return (
    <Container>
      <Typography variant="h1">Journal</Typography>
      <AddEntry save={save} />
      {
        loading ? (<Typography variant="body1">Loading...</Typography>) : null
      }
      {
        journalEntries.map((entry, index) => (
          <Entry
            key={entry.id}
            entry={entry}
            update={update}
            index={index}
          />
        ))
      }
    </Container>
  );
}

const HomePage = () => {
  return (
    <JournalContainerClass>
      <Journal />
    </JournalContainerClass>
  );
}

export default HomePage;
