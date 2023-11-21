const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title: {type:String},
    summary: {type:String}, 
    content: {type:String},
    cover: {type:String},
    //author:{type:Schema.Types.ObjectId, ref:'User'},

}, {
    timestamps: true,
});

module.exports = mongoose.model('post', PostSchema)