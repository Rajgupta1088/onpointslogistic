

const mongoose = require('mongoose');
const Testimonial = require('../../models/admin/testimonialModel');


const testmonialPage = (req, res) => {
    res.render('pages/WebsiteManagement/testimonial');
}

// Fetch testimonials (for DataTable)
const getTestimonials = async (req, res) => {
    try {
        const { start, length, search } = req.body;
        let query = {};
        if (search?.value) {
            query = { name: new RegExp(search.value, 'i') };
        }

        const testimonials = await Testimonial.find(query).skip(Number(start)).limit(Number(length));
        const totalRecords = await Testimonial.countDocuments();
        const filteredRecords = await Testimonial.countDocuments(query);

        res.json({
            draw: req.body.draw,
            recordsTotal: totalRecords,
            recordsFiltered: filteredRecords,
            data: testimonials
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Save testimonial
const saveTestimonial = async (req, res) => {
    try {
        const { name, message } = req.body;
        const testimonial = new Testimonial({ name, message });
        await testimonial.save();
        res.json({ success: true, message: 'Testimonial saved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Edit testimonial
const editTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, message } = req.body;
        await Testimonial.findByIdAndUpdate(id, { name, message, updatedAt: new Date() });
        res.json({ success: true, message: 'Testimonial updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete testimonial
const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        await Testimonial.findByIdAndDelete(id);
        res.json({ success: true, message: 'Testimonial deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { testmonialPage, getTestimonials, saveTestimonial, editTestimonial, deleteTestimonial }
