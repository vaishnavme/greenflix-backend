const mongoose = require("mongoose");
const { Schema } = mongoose;

const watchlaterSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    }
})

const WatchLater = mongoose.model("WatchLater", watchlaterSchema);
module.exports = { WatchLater }