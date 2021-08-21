const mongoose = require('mongoose');
const {Schema} = mongoose;

const apodschema = new Schema(
    {
        date: {type: String, required: true},
        url: {type: String, required: true},
        media_type: {type: String, required: true},
        explanation: {type: String, required: true},
        title: {type: String, required: true}
    },
    {
        timestamps: true
    }
);


const Apod = mongoose.model('Apod', apodschema);

module.exports = Apod