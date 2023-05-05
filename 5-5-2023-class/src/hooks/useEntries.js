import { useCallback, useEffect, useState } from "react";

const useEntries = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5100/entries')
      .then(response => response.json())
      .then((result) => {
        setEntries(result.data);
        setLoading(false);
      });
  }, []);

  const addEntry = useCallback((entry) => {
    setEntries([
      entry,
      ...entries,
    ]);
    setLoading(true);

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
      setEntries(result.data);
      setLoading(false);
    })
    .catch(() => {
      entries.shift();
      setEntries([
        ...entries,
      ]);
    });
  }, [entries]);

  const toggleOpen = useCallback((entryId) => {
    const newEntries = entries.map(entry => {
      if (entry.id === entryId) {
        entry.open = !entry.open;
      }
      return entry;
    });

    setEntries(newEntries);
  }, [entries, setEntries]);

  return {
    loading,
    toggleOpen,
    addEntry,
    entries,
  };
};

export default useEntries;
