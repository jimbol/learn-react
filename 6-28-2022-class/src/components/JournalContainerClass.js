import { Button, Container, Typography } from '@mui/material';
import React from 'react';

import Entry from "./Entry";
import AddEntry from './AddEntry';

class JournalContainer extends React.Component {
  state = {
    entries: [],
    loading: false,
  }

  setLoading(loading) {
    this.setState({ loading })
  }
  setEntries(entries) {
    this.setState({ entries })
  }

  save(entry) {
    this.setEntries([
      entry,
      ...this.state.entries
    ])
    this.setLoading(true);
    fetch('http://localhost:5000/entry', {
      method: 'post',
      body: JSON.stringify({
        entry,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then((result) => {
        this.setEntries(result.data);
        this.setLoading(false);
      });
  }

  // componentDidUpdate() {}
  componentDidMount() {
    this.setLoading(true);
    fetch('http://localhost:5000/entries')
      .then(response => response.json())
      .then(result => {
          this.setLoading(false);
          this.setEntries(result.data);
        })
  }

  render() {
    const childrenWithProps = React.Children.map(
      this.props.children,
      (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            save: this.save.bind(this),
            entries: this.state.entries,
            loading: this.state.loading,
          });
        }

        return child;
      }
    );

    return (
      <>{childrenWithProps}</>
    );
  }
}

const JournalView = ({ save, loading, entries }) => {
  return (
    <Container>
      <Typography variant="h1">Journal</Typography>
      <AddEntry save={save} />
      {
        loading ? (<Typography variant="body1">Loading...</Typography>) : null
      }
      {
        entries.map(entry => (
          <Entry
            key={entry.id}
            entry={entry}
          />
        ))
      }
    </Container>
  );
}

const Journal = () => {
  return (
    <JournalContainer>
      <JournalView />
    </JournalContainer>
  );
};

export default Journal;
