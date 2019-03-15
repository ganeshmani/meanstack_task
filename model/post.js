const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name : { type : String },
    upvotes : { type : Number },
    avatar : { type:String },
    description : { type : String }
},{ timestamps : true})

const posts = mongoose.model('posts',postSchema);

module.exports = posts;