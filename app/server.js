const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
const { sequelize } = require('./models/index');


app.use(function(req, res, next) {
  var oneof = false;
  if(req.headers.origin) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      oneof = true;
  }
  if(req.headers['access-control-request-method']) {
      res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
      oneof = true;
  }
  if(req.headers['access-control-request-headers']) {
      res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
      oneof = true;
  }
  if(oneof) {
      res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
  }

  // intercept OPTIONS method
  if (oneof && req.method == 'OPTIONS') {
      res.send(200);
  }
  else {
      next();
  }
})

// Settings
const PORT = process.env.PORT || 9001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use(require('./routes'));

app.listen(PORT, function () {
  console.log(`Example app listening on http://localhost:${PORT}`);
  


  sequelize.authenticate().then(() => {
      console.log('Database konnek');


  })
});