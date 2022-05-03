const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, '../build')));
// app.use(express.json);

app.get('/api', (req, res) => {
  res.send('Hello Robby, from server.js!');
});

app.use((req, res) => {
  res.status(404).send('Invalid Route');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
