var express = require('express');
var router = express.Router();
var Task = require('../models/task');
var config = require('../../config/database');
var port = process.env.PORT || 8080;

router.get('/test', function(req, res) {
	res.send('Good morning! The api is at http://localhost:' + port + '/api');
});

router.get('/hello', function(req, res) {
	res.send('Hello user!');
});

//create a new task in your calendar
router.post('/newTask', function(req, res) {
	if(!req.body.name) {
		res.json({success: false, msg: 'Please add name to the task'});
	} else {
		var date = new Date(req.body.date); // new line
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December'];
		var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		var weekDay = weekDays[date.getDay()];
		var month = months[date.getMonth()];

		console.log(date, month); // new line

		var newTask = new Task({
			name: req.body.name,
			project: req.body.project,
			date: req.body.date,
			displayDate: weekDay + ' ' + date.getDate() + ' ' + month + ' ' + date.getFullYear(),
			priority: req.body.priority || 4,
			tags: req.body.tags,
			parent: req.body.parent,
			comments: req.body.comments,
			reminders: req.body.reminders
		});

		newTask.save(function(err) {
			if(err) {
				return res.json({success: false, msg: 'Unable to add the task to the list'});
			}
			res.json({success: true, msg: 'New task added to your list'});
		});
	}
});

router.get('/tasksList', function(req, res) {
	Task.find({}, function(err, tasks) {
		if(err) throw err;

		if(!tasks) {
			return res.status(403).send({success: false, msg: 'Operation failed. There are no tasks to retrieve!'});
		} else {
			res.status(200).json({success: true, msg: 'Data retrieved', data: tasks});
		}
	});
});

module.exports = router;