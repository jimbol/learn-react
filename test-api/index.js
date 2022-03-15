const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000'
}));

let data = [{
  id: 1,
  mood: 'smile',
  text: 'I felt good about teaching today',
  date: (new Date()).toLocaleDateString("en-US"),
  open: true,
}, {
  id: 2,
  mood: 'sad',
  text: 'Current events have been bringing me down',
  date: (new Date()).toLocaleDateString("en-US"),
  open: false,
}];

app.get('/entries', (req, res) => {
  res.send({
    data,
  })
});
app.post('/entry', (req, res) => {
  const post = req.body.post;
  data = [
    post,
    ...data,
  ];
  res.send({
    data,
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
