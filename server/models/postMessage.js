import mongoose from 'mongoose';

const postSchema =  mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    name: String,
    tags: [String],
    selectedFile: {type: String,
                   required: true},
    likes: {
        type: [String ], default: []
    },
    comments: {
        type: [String], default: []
    }, 
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;