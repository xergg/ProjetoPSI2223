const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, unique:true, required: true },
    password: { type: String, required: true },
    profile_image: { type: String, required: false },
    items: [{
        item: {type: Schema.Types.ObjectId, ref: 'Item', required: true},
        date: {type: Date,required: true},
        _id:false
    }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    wishlist: [{ type: Schema.Types.ObjectId,  ref: 'Item', required: false }],
    cart: [{
        item: {type: Schema.Types.ObjectId, ref: 'Item', required: true},
        quantity: {type: Number,required: true},
        _id:false
    }]
});

module.exports = mongoose.model('User', UserSchema);