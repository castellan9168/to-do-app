var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	project: {
		type: String
	},
	date: {
		type: Date
	},
	displayDate: {
		type: String
	},
	priority: {
		type: Number
	},
	tags: {
		type: Array
	},
	parent: {
		type: String
	},
	comments: {
		type: String
	},
	reminders: {
		type: Array
	}
});


// new method
taskSchema.methods.convertDate = function(date) {
	var temp = new  Date(date);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var year = temp.getFullYear();
	var month = months[temp.getMonth()];
	var day = temp.getDate();
	var weekDay = weekDay[temp.getDay()];

	return weekDay + ' ' + day + ' ' + month + ' ' + year;
};

module.exports = mongoose.model('Task', taskSchema);