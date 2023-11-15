const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true, 'product name must be provided'],
        min: 4,
        unique: true
    },
    password:{
        type:String,
        require:[true, 'product price must be provided'],

    },
});

module.exports = mongoose.model('user', userSchema)