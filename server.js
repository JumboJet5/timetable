//Install express server
const path = require('path');
const express = require('express');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist'));

app.get('/*', function(req,res) {
  res.sendFile(path.resolve('./dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
