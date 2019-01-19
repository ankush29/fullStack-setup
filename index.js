const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const pe = require('parse-error');
const cors = require('cors');

const v1 = require('./server/routes/v1');
const CONFIG = require('./server/config/config');
const models = require("./server/models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

//Passport
app.use(passport.initialize());
app.use(cors());
app.use('/v1', v1);

models.sequelize.authenticate().then(() => {
  console.log('Connected to SQL database:', CONFIG.db_name);
})
.catch(err => {
  console.error('Unable to connect to SQL database:',CONFIG.db_name);
});
if(CONFIG.app==='dev'){
  models.sequelize.sync();
  // models.sequelize.sync({ force: true });
}

app.use('/', function(req, res){
 res.statusCode = 200;//send the appropriate status code
 res.json({status:"success", message:"Parcel Pending API", data:{}})
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send('this'+req.body.post);
});

if (process.env.NODE_ENV !== 'development') {
  console.log('process.env.NODE_ENV---',process.env.NODE_ENV);
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(3030, () => console.log('Server running on port 3030'))

process.on('unhandledRejection', error => {
  console.error('Uncaught Error', pe(error));
});
module.exports = app;
