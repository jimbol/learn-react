import { Button, Container, Typography } from '@mui/material';
import React from 'react';

import Entry from "./Entry";
import AddEntry from './AddEntry';

export default class Journal extends React.Component {
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
    return (
      <Container>
        <Typography variant="h1">Journal</Typography>
        {
          this.state.loading ? (<span>Loading...</span>) : null
        }
        <AddEntry save={this.save.bind(this)} />
        <div>
          {
            this.state.entries.map((entry) => {
              return (<Entry key={entry.id} entry={entry} />);
            })
          }
        </div>
        <Button
          onClick={() => this.setEntries([])}
        >
          Clear Journal
        </Button>
      </Container>
    );
  }
}
