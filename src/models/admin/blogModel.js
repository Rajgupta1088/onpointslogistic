const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    banner_image: { type: String, required: true },
    poster_image: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
