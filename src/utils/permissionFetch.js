const PermissionModel = require("../models/admin/permission"); // renamed for clarity


exports.permissionFetch = async () => {
    try {
        // Normally you should get userId from session, but for testing:
        const userId = "67d9a718bd111cc7a938d879"; // Replace with actual session userId if available

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: No user ID in session" });
        }

        // Fetch user using PermissionModel
        const user = await PermissionModel.findOne({ _id: userId });

        // console.log('User found ->', user);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Extract permissions
        let userPermissions = user.permissions;

        // Add module_permission key
        const updatedPermissions = userPermissions.map(permission => {
            const hasAnyPermission = permission.add || permission.edit || permission.delete || permission.export;
            return {
                ...permission.toObject(), // Convert Mongoose doc to plain object
                module_permission: hasAnyPermission ? true : false
            };
        });

        // Store in session (with module_permission)
        req.session.permission = updatedPermissions;

        console.log('updatedPermissions->', updatedPermissions);

        res.status(200).json({
            message: "Permission fetched successfully",
            permission: updatedPermissions
        });

    } catch (err) {
        console.error("Error fetching permission:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};





