const Entry = (props) => {
  const { entry } = props;
  let entryContents = (<hr />);

  if (entry.open) {
    entryContents = (
      <div>
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
    <div>
      <h2>{entry.date} &#x21c5;</h2>
      {entryContents}
    </div>
  );
};
export default Entry;
