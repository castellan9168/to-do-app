var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	project: {
		type: String
	},
	dueDate: {
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

module.exports = mongoose.model('Task', taskSchema);