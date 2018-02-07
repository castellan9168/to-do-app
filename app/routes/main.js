var express = require('express');
var router = express.Router();
var Task = require('../models/task');
var config = require('../../config/database');
var db = config.database;
var port = process.env.PORT || 8080;

router.get('/test', function(req, res) {
	res.send('Good morning! The api is at http://localhost:' + port + '/api');
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

// I do not understand why this code worked while I could not just use deleteOne
// method.
router.post('/removeTask', function(req, res) {
	Task.findOne({"_id": req.body._id}, function (err, task) {
		if (err) res.send(err);
		task.remove(function(err) {
			if (err) return res.json({success: false, msg: 'Unable to delete task'});

			res.json({success: true,  msg: 'Task deleted'});
		})
	});
})

router.put('/completeTask', function(req, res) {
	Task.findOne({'_id': req.body._id}, function(err, task) {
		if (err) res.send(err);

		task.completed = true;

		task.save(function(err) {
			if (err) return res.json({success: false, msg: 'Unable to update task'});

			res.json({success: true,  msg: 'Task updated'});
		})
	})
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
