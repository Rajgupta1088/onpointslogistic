
const bannerPage = (req, res) => {
    res.render('pages/WebsiteManagement/banner');
}


const Banner = require("../../models/admin/bannerModel");
const path = require("path");
const fs = require("fs");

// Show all banners
const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find().sort({ createdAt: -1 });
        res.render("banners/list", { banners });
    } catch (err) {
        res.status(500).send("Error fetching banners");
    }
};

// Render Add Banner Form
const addBannerForm = (req, res) => {
    res.render("banners/form", { banner: null });
};

// Save New Banner
const createBanner = async (req, res) => {
    try {
        if (!req.file) return res.status(400).send("Image is required");

        const banner = new Banner({
            image: "/uploads/" + req.file.filename,
            text: req.body.text,
            status: req.body.status || "Active",
        });

        await banner.save();
        res.redirect("/admin/banners");
    } catch (err) {
        res.status(500).send("Error creating banner");
    }
};

// Render Edit Banner Form
const editBannerForm = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) return res.status(404).send("Banner not found");

        res.render("banners/form", { banner });
    } catch (err) {
        res.status(500).send("Error fetching banner");
    }
};

// Update Banner
const updateBanner = async (req, res) => {
    try {
        let banner = await Banner.findById(req.params.id);
        if (!banner) return res.status(404).send("Banner not found");

        banner.text = req.body.text;
        banner.status = req.body.status;

        if (req.file) {
            // Delete old image
            fs.unlinkSync(path.join(__dirname, "../public", banner.image));
            banner.image = "/uploads/" + req.file.filename;
        }

        await banner.save();
        res.redirect("/admin/banners");
    } catch (err) {
        res.status(500).send("Error updating banner");
    }
};

// Delete Banner
const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) return res.status(404).send("Banner not found");

        // Delete image file
        fs.unlinkSync(path.join(__dirname, "../public", banner.image));

        await banner.deleteOne();
        res.redirect("/admin/banners");
    } catch (err) {
        res.status(500).send("Error deleting banner");
    }
};


module.exports = {
    deleteBanner, addBannerForm, createBanner, getBanners, editBannerForm, updateBanner, bannerPage
}