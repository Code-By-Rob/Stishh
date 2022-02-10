const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    articles: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }],
    photo: {
        type: String,
    },
    drafts: [{
        type: Schema.Types.ObjectId,
        ref: 'Draft'
    }],
    links: [{
        type: Object
    }],
    title: {
        type: String,
    },
    profilePicture: String,
    role: {
        type: String,
    }
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema, 'users');