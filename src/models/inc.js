const mongoose = require('mongoose');

const incSchema = new mongoose.Schema({
    inc: {
        type: Number,
    },
    reino: {
        type: Number,
    },
    buscador: {
        type: String,
    }

});

module.exports = mongoose.model('Inc', incSchema);