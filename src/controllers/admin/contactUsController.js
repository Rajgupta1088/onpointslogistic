const Contact = require('../../models/admin/contactUsModel')

const contactUsPage = (req, res) => {
    res.render('pages/WebsiteManagement/contactUs');
}

const contactList = async (req, res) => {

    try {
        const { start, length, search } = req.body;
        let query = {};
        if (search?.value) {
            query = {
                $or: [
                    { name: new RegExp(search.value, 'i') },
                    { email: new RegExp(search.value, 'i') },
                    { message: new RegExp(search.value, 'i') }
                ]
            };
        }

        const contacts = await Contact.find(query).skip(Number(start)).limit(Number(length));
        const totalRecords = await Contact.countDocuments();
        const filteredRecords = await Contact.countDocuments(query);

        res.json({
            draw: req.body.draw,
            recordsTotal: totalRecords,
            recordsFiltered: filteredRecords,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
const saveContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contact = new Contact({ name, email, message });
        await contact.save();
        res.json({ success: true, message: 'Contact saved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const editContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, message } = req.body;
        await Contact.findByIdAndUpdate(id, { name, email, message, updatedAt: new Date() });
        res.json({ success: true, message: 'Contact updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        res.json({ success: true, message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { contactUsPage, contactList, saveContact, editContact, deleteContact }