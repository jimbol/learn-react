import { Card, Typography } from "@mui/material";

const Entry = ({
  id,
  text,
  mood,
  date,
  open,
  toggleOpen,
}) => {
  return (
    <Card
      style={{
        padding: 12,
        margin: 4,
      }}
      onClick={() => toggleOpen(id)}
    >
      <Typography variant="h3">{mood}</Typography>
      {
        open ? (
          <>
            <Typography variant="subtitle2">{date.toString()}</Typography>
            <Typography variant="body">{text}</Typography>
          </>
        )
        : null
      }
    </Card>
  );
};

export default Entry;
