const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: Boolean, default: true },
    image: { type: String } // Stores filename of the image
}, { timestamps: true });

module.exports = mongoose.model('Banner', BannerSchema);
