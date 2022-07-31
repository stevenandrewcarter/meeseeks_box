// Loads the configuration from config.env to process.env
require('dotenv').config({path: './config.env'});

// Load the DB
// const dbo = require('./db/conn');

const PORT = process.env.PORT || 5000;

// dbo.connectToServer(function(err) {
//   if (err) {
//     console.error(err);
//     process.exit();
//   }

//   app.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
//   });
// });

const app = require('./app');
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
