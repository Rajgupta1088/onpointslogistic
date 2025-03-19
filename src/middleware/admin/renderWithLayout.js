module.exports = (req, res, next) => {
    res.renderWithLayout = (view, title = '', data = {}) => {
        res.render('layout/main', {
            title,                    // Page title
            body: view,               // View to render dynamically
            user: req.session.user,   // User data from session
            permissions: req.permissions, // Global permissions
            ...data                   // Additional data for view
        });
    };
    next();
};
