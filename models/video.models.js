const mongoose = require("mongoose");
const { Schema } = mongoose;

const VideoSchema = new Schema({
    link: {
        type: String,
        required: "Video link is required"
    },
    title: {
        type: String,
        required: "Video title name required"
    },
    image: {
        type: String,
        required: "Video thumbnail image required",
    },
    description: {
        type: String,
        required: "Video description is required"
    },
    name: {
        type: String,
        required: "Video creator name required"
    },
    profilelink: {
        type: String,
        required: "Video creator profile link"
    },
    channellink: {
        type: String,
        required: "Video creator channel link required"
    },
    views: {type: String, required: "Video views required"}
})

const Video = mongoose.model("Video", VideoSchema);

module.exports = { Video };