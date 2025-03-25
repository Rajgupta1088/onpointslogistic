
const express = require('express');
const router = express.Router();
const AdminUser = require('../../models/admin/adminModel');

const bcrypt = require('bcrypt');

const saveRolesPermissions = async (req, res) => {
    try {
        const { name, mobile, email, admin_type, password, country_access, city_access, permissions } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const adminUser = new AdminUser({
            name,
            mobile,
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
    res.render('pages/Roles/roles');
}

const backendUser = (req, res) => {
    res.render('pages/Roles/backend_user');
}


const getList = async (req, res) => {

    try {
        let search = req.body.search?.value || '';
        let start = parseInt(req.body.start) || 0;
        let length = parseInt(req.body.length) || 10;

        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { mobile: { $regex: search, $options: 'i' } }
                ]
            };
        }

        let totalRecords = await AdminUser.countDocuments();
        let filteredRecords = await AdminUser.countDocuments(query);
        let users = await AdminUser.find(query).skip(start).limit(length);

        res.json({
            draw: req.body.draw,
            recordsTotal: totalRecords,
            recordsFiltered: filteredRecords,
            data: users // must be array of objects matching columns
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
module.exports = { rolesPermissions, saveRolesPermissions, backendUser, getList }