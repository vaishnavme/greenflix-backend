const mongoose = require('mongoose');
const { Schema } = mongoose;

const likedSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }
});

const LikedVideos = mongoose.model('LikedVideos', likedSchema);
module.exports = { LikedVideos };
