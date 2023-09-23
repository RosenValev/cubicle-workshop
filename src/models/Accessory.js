const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        required: true,
        typeof: String,
    },
    imageUrl: {
        required: true,
        typeof: String,
    },
    description: {
        required: true,
        typeof: String,
    }
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;