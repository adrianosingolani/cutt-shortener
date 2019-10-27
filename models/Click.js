const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
    urlId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = Click = mongoose.model('click', clickSchema);