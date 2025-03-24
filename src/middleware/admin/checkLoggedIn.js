module.exports = (req, res, next) => {
    if (req.session && req.session.isLoggedIn) {
        // User is logged in
        console.log('session', req.session.modulePermissions);

        if (req.originalUrl === '/') {
            return res.redirect('/dashboard'); // Redirect to dashboard
        } else {
            const permissions = req.session.modulePermissions;
            let hasPermission = false;

            // Loop over permissions
            for (const [key, value] of Object.entries(permissions)) {
                console.log(`${key}: ${value}`);

                // Check if the requested URL matches permission key AND permission is true
                if (req.originalUrl.includes(key) && value === true) {
                    hasPermission = true;
                    break; // No need to check further
                }
            }

            if (hasPermission) {
                return next(); // Allow access
            } else {
                console.log(`Permission denied for ${req.originalUrl}`);
                return res.redirect('/permissionDenied'); // Redirect to permission denied page
            }
        }
    } else {
        // User not logged in
        if (req.originalUrl === '/') {
            return next(); // Allow access to login page
        } else {
            return res.redirect('/'); // Redirect to login page
        }
    }
};
