import { useCallback, useEffect, useState } from 'react';

const defaultJournalEntries = [];

function useJournalEntries () {
  const [journalEntries, setJournalEntries] = useState(defaultJournalEntries);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialized) return;

    setInitialized(true);
    setLoading(true);
    fetch('http://localhost:5000/entries')
      .then(response => response.json())
      .then((result) => {
        setJournalEntries(result.data);
        setLoading(false);
      });
  }, [initialized, setJournalEntries, setLoading]);

  const update = useCallback((entryChanges) => {
    const originalEntryIndex = journalEntries.findIndex(({ id }) => entryChanges.id === id);

    const updatedEntry = {
      ...journalEntries[originalEntryIndex],
      ...entryChanges,
    };

    const updatedEntries = [
      ...journalEntries,
    ];

    updatedEntries[originalEntryIndex] = updatedEntry;
    setJournalEntries(updatedEntries)
  }, [journalEntries, setJournalEntries]);

  const save = useCallback((newEntry) => {
    setJournalEntries([
      newEntry,
      ...journalEntries,
    ]);
    setLoading(true);

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
        setJournalEntries(result.data);
        setLoading(false);
      });
  }, [journalEntries, setJournalEntries, setLoading]);

  return {
    loading,
    update,
    save,
    journalEntries,
  };
}

export default useJournalEntries;
