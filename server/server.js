// Loads the configuration from config.env to process.env
require('dotenv').config({path: './config.env'});

const express = require('express');
const cors = require('cors');
// Load the DB
// const dbo = require('./db/conn');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(require('./routes/record'));
app.use(require('./routes/containers'));
app.use(require('./routes/images'));

// Global Error handling
app.use(function(err, _req, res) {
  console.log(err.stack);
  res.status(500).send('Something broke!');
});

// dbo.connectToServer(function(err) {
//   if (err) {
//     console.error(err);
//     process.exit();
//   }

//   app.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
//   });
// });
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
