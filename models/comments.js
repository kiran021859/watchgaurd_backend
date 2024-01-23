const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  
  Comment: String,
}, {
    timestamps: true,
});

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;