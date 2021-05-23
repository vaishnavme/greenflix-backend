const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const playlistSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likedvideos: [
        { type: Schema.Types.ObjectId, ref: "Video" }
    ],
    watchlater: [
        { type: Schema.Types.ObjectId, ref: "Video" }
    ],
    playlist: [{
        name: {type: String, required: "Playlist name required"},
        videos: [{ type: Schema.Types.ObjectId, ref: "Video" }]
    }]
})

const Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = { Playlist };