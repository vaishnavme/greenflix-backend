const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
    name: {
        type: String,
        required: "Product name is required"
    },
    email: {
        type: String,
        unique: [true, "email address already in"],
        required: "email adderess is required"
    },
    password: {
        type: String,
        required: "password is required"
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

const User = mongoose.model("User", userSchema);
  
module.exports = { User };