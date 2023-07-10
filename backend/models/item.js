const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, unique:true, required: true },
    type: { type: String, required: true },
    description: { type: String, required: false },
    platform: { type: [String], required: false },
    languages: { type: [String], required: false },
    price: { type: Number, required: true },
    principal_image: { type: String, required: false},
    rates: [{
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        message: { type: String, required: false },
        rate: { type: Number, required: true },
        opinions: [{
            user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            flag: { type: Boolean, required: true },
            _id: false
        }],
        answers: [{
            user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            message: { type: String, required: true },
            _id: false
        }]
    }]
});

module.exports = mongoose.model('Item', ItemSchema);