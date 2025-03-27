const mongoose = require("mongoose");

const bannerModel = new mongoose.Schema({
    image: { type: String, required: true }, // Stores file path
    text: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
}, { timestamps: true });

module.exports = mongoose.model("Banner", bannerModel);
