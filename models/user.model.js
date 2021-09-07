const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
    name: {
        type: String,
        required: 'Product name is required'
    },
    email: {
        type: String,
        unique: [true, 'email address already in'],
        required: 'email adderess is required'
    },
    password: {
        type: String,
        required: 'password is required'
    },
    playlists: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Playlist'
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
