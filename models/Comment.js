var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
	comment: {
		type: String
	},

	body: {
		type: String
	}
})

// Create the Note model with the NoteSchema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Note model
module.exports = Comment;
