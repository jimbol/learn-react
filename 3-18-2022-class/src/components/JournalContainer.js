import React from 'react';
import { Container, Typography } from '@mui/material';
import Entry from './Entry';
import AddEntry from './AddEntry';

class JournalContainer extends React.Component {
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
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
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

class Journal extends React.Component {
  render() {
    const { entries, isLoading } = this.props;
    return (
      <Container>
        <Typography variant="h1">Journal</Typography>
        <AddEntry save={this.props.save}/>
        {
          isLoading ? (<p>Loading...</p>) : null
        }
        {
          entries.map((entry) => (
          <Entry
            key={entry.id}
            entry={entry}
            updateEntry={this.props.update}
          />
          ))
        }
      </Container>
    );
  }
}

const HomePage = () => {
  return (
    <JournalContainer>
      <Journal />
    </JournalContainer>
  );
}
export default HomePage;
