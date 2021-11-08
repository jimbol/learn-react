const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get('/', (req, res) => {
  res.send({
    data: [{
      label: 'Add a to-do',
      done: false,
      id: 1231231231231,
    }]
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
