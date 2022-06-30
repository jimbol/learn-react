import { useCallback, useEffect, useState } from 'react';

const useEntries = () => {
  const [entries, setEntries] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialized) return;
    setInitialized(true);

    setLoading(true);
    fetch('http://localhost:5000/entries')
    .then(response => response.json())
    .then(result => {
        setLoading(false);
        setEntries(result.data);
      })
  }, [initialized, setInitialized]);

  const save = useCallback((entry) => {
    setEntries([
      entry,
      ...entries
    ])
    setLoading(true);
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
        setEntries(result.data);
        setLoading(false);
      });
  }, [entries]);

  return {
    save,
    loading,
    entries,
    setEntries,
  }
};

export default useEntries;
