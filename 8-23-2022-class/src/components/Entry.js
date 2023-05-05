import { Card, Typography } from "@mui/material";
import { useCallback } from "react";

function Entry ({ entry, index, update }) {
  let entryContents = null;

  const toggleOpen = useCallback(() => {
    update({
      ...entry,
      open: !entry.open,
    })
  }, [entry, update])

  if (entry.open) {
    entryContents = (
      <>
        <Typography variant="h4">{entry.mood} - {entry.text}</Typography>
      </>
    );
  }

  return (
    <Card
      style={{
        padding: 12,
        margin: 4,
      }}
      onClick={toggleOpen}
    >
      <Typography variant="h3">{index + 1}. {entry.date}</Typography>
      {entryContents}
    </Card>
  );
}

export default Entry;
