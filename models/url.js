const mongoose = require('mongoose');

// Define the schema for the URL model
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        // required: true
    }


}, { timestamps: true });

const URL = mongoose.model('Url', urlSchema);
module.exports = URL;