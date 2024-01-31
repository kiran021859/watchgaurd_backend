const mongoose = require('mongoose');


const PostManenbergSchema = new mongoose.Schema({
    Title: {type:String},
    Type: {type:String}, 
    Content: {type:String},
    //cover: {type:String},
    //author:{type:Schema.Types.ObjectId, ref:'User'},

}, {
    timestamps: true,
});

module.exports = mongoose.model('postManenberg', PostManenbergSchema)