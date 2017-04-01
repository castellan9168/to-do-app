// modules ==============================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
//var passport = require('passport');
var task = require('./app/models/task'); // get the task model
var config = require('./config/database'); // database configuration
var port = process.env.PORT || 8080; // set our port
//var port = 3001; // set our port
var express = require('express');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//log to console
app.use(morgan('dev'));

//use the passport package in our application
//app.use(passport.initialize());
//pass passport for configuration
//require('./config/passport')(passport);

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	if (req.method === 'OPTIONS') {
		res.end();
	} else {
		next();
	}
});

mongoose.connect(config.database);

//routes
app.use('/api', require('./app/routes/main'));

//startup
app.listen(port);
console.log('Application started on port' + port);

exports = module.exports = app;