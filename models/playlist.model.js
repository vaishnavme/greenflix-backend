const mongoose = require("mongoose");
const { Schema } = mongoose;

const playlistSchema = new Schema({
    playlistName: {
        type: String,
        required: "Playlist name required"
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    video: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }]
})

const Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = { Playlist }