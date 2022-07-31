const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
// app.use(require('./routes/record'));
app.use('/containers', require('./routes/containers'));
app.use(require('./routes/images'));
app.use(require('./routes/networks'));
app.use(require('./routes/volumes'));

// Global Error handling
// app.use((err, _req, res) => {
//   console.log(err.stack);
//   res.status(500).send('Something broke!');
// });

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

module.exports = app;
