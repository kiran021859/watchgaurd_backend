const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  postId: String,
  commentText: String,
}, {
    timestamps: true,
});

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;