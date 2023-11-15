const mongoose = require('mongoose');
const {Schema, model} = mongoose

const CommunitySchema = new Schema({
    Community: {type:String},
    people_joined: {type:String},
    //author:{type:Schema.Types.ObjectId, ref:'User'},

});

module.exports = model('community', CommunitySchema)