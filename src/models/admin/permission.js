const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
    module: { type: String, required: true },
    add: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
    export: { type: Boolean, default: false }
}, { _id: false }); // No _id needed for subdocument

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    admin_type: { type: String, required: true },
    country_access: { type: Boolean, default: false },
    city_access: { type: Boolean, default: false },
    permissions: { type: [PermissionSchema], default: [] }
}, { timestamps: true }); // Add timestamps

module.exports = mongoose.model("backend_user", AdminSchema);
