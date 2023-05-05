import React from "react";
import { Container } from "@mui/material";
import AddEntry from "../components/AddEntry";
import Entry from "../components/Entry";

export default class JournalClass extends React.Component {
  state = {
    entries: [],
    loading: false,
  }

  setEntries(entries) {
    this.setState({
      entries,
    });
  }

  setLoading(loading) {
    this.setState({
      loading,
    });
  }

  componentDidMount() {
    this.setLoading(true);
    fetch('http://localhost:5100/entries')
      .then(response => response.json())
      .then((result) => {
        this.setEntries(result.data);
        this.setLoading(false);
      });
  }

  addEntry(entry) {
    this.setEntries([
      entry,
      ...this.state.entries,
    ]);
    this.setLoading(true);

    fetch('http://localhost:5100/entry', {
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
    })
    .catch(() => {
      this.state.entries.shift();
      this.setEntries([
        ...this.state.entries,
      ]);
    });
  }

  render () {
    if (this.state.loading) {
      return (
        <Container>Loading...</Container>
      );
    }

    return (
      <Container>
        <AddEntry addEntry={this.addEntry.bind(this)} />

        {
          this.state.entries.map(entry => (
            <Entry
              toggleOpen={() => {}}
              key={entry.id}
              id={entry.id}
              text={entry.text}
              mood={entry.mood}
              date={entry.date}
              open={entry.open}
            />
          ))
        }
      </Container>
    );
  }
}
