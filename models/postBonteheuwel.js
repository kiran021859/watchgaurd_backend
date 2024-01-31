const mongoose = require('mongoose');


const PostBonteheuwelSchema = new mongoose.Schema({
    Title: {type:String},
    Type: {type:String}, 
    Content: {type:String},
    //cover: {type:String},
    //author:{type:Schema.Types.ObjectId, ref:'User'},

}, {
    timestamps: true,
});

module.exports = mongoose.model('postBonteheuwel', PostBonteheuwelSchema)