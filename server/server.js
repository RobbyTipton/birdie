const path = require('path');
const express = require('express');
const app = express();
const scorecardRouter = require('./routes/scorecard.js');
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, '../build')));
app.use(express.json());

app.use('/api/scorecard', scorecardRouter);

app.get('/api', (req, res) => {
  res.send('Hello Robby, from server.js!');
});

app.use((req, res) => {
  res.status(404).send('Invalid Route');
});

app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Unknown error in middleware.',
    status: 400,
    message: { err: 'An error occurred.' },
  };
  const customError = Object.assign(defaultError, err);
  console.log(customError.log);
  return res.status(customError.status).json(customError.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
