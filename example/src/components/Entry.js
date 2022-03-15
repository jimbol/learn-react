import { useCallback } from "react";

const Entry = ({ entry, updateEntry }) => {
  let entryContents = <hr />;

  const toggleOpen = useCallback(() => {
    updateEntry({
      ...entry,
      open: !entry.open,
    });
  }, [updateEntry, entry])

  if (!entry) return null;

  if (entry.open) {
    entryContents = (
      <div
        onClick={toggleOpen}
      >
        <h3>
          Mood: {entry.mood}
        </h3>
        <p>
          {entry.text || 'N/A'}
        </p>
        <hr />
      </div>
    );
  }

  return (
    <div
      onClick={toggleOpen}
    >
      <h2>{entry.date} &#x21c5;</h2>
      {entryContents}
    </div>
  );
};

export default Entry;
