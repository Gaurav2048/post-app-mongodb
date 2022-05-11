const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [ 4, 'Minimum 4 characters for a title' ]
    }, 
    description: {
        type: String,
        required: true,
    }, 
    createdBy: {
        type: String,
        required: true
    }
})

const PostModel = mongoose.model('posts_collection', PostSchema);
module.exports = PostModel;