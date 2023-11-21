        const mongoose = require('mongoose');
        const {Schema, model} = mongoose;

        const commentsSchema = new Schema({
            postId: {type:String},
            commentText: {type:String}

        })


        module.export = model('comments', commentsSchema )                          