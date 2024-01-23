const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  
  Comment: {
    type: String,
    required: true,
  },
  PostId: {
    type: String,
    required: true,
  },
}, {
    timestamps: true,
});

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;