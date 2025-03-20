
const express = require('express');
const router = express.Router();
const AdminUser = require('../../models/admin/AdminUser');

const bcrypt = require('bcrypt');

const saveRolesPermissions = async (req, res) => {
    try {
        const { name, email, admin_type, password, country_access, city_access, permissions } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const adminUser = new AdminUser({
            name,
            email,
            admin_type,
            password: hashedPassword,
            country_access,
            city_access,
            permissions
        });

        await adminUser.save();
        res.json({ success: true, message: 'Admin saved successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error saving admin', error: error.message });
    }
}

const rolesPermissions = (req, res) => {
    res.render('pages/roles');
}

module.exports = router;
module.exports = { rolesPermissions, saveRolesPermissions }