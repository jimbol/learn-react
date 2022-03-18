const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

let data = [{
  id: 1,
  mood: 'happy',
  text: 'I felt good about teaching today',
  date: (new Date()).toLocaleDateString("en-US"),
  open: true,
}, {
  id: 2,
  mood: 'sad',
  text: 'Current events have been bringing me down',
  date: (new Date()).toLocaleDateString("en-US"),
  open: false,
}, {
  id: 3,
  mood: 'excited',
  text: 'Excited for the weekend',
  date: (new Date()).toLocaleDateString("en-US"),
  open: false,
}];

app.get('/entries', (req, res) => {
  res.send({
    data,
  })
});

app.post('/entry', (req, res) => {
  console.log(req.body.entry);
  const entry = req.body.entry;

  data = [
    entry,
    ...data,
  ];
  res.send({
    data,
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
