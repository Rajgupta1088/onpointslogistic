const Permission = require('../../models/admin/permission'); // Correct model import

const fetchPermissions = async (userId, session) => {
    try {
        if (!userId) {
            throw new Error("Unauthorized: No user ID provided");
        }

        // Fetch user permissions
        const user = await Permission.findOne({ _id: userId });

        if (!user) {
            throw new Error("User not found");
        }

        // Extract permissions
        let userPermissions = user.permissions;

        // Add module_permission key
        const updatedPermissions = userPermissions.map(permission => {
            const hasAnyPermission = permission.add || permission.edit || permission.delete || permission.export;
            return {
                ...permission.toObject(),
                module_permission: hasAnyPermission
            };
        });

        // Store in session
        session.permission = updatedPermissions;

        // console.log('Permissions stored in session:', updatedPermissions);

        return updatedPermissions; // Return if you want to use elsewhere
    } catch (err) {
        console.error("Error in fetchPermissions:", err.message);
        throw err; // Handle in calling function
    }
};

module.exports = fetchPermissions;
