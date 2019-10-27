const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    urlCode: { 
        type: String,
        required: true,
        unique: true
    },
    longUrl: { 
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = Url = mongoose.model('url', urlSchema);