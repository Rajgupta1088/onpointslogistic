module.exports = (req, res, next) => {
    if (req.session && req.session.isLoggedIn) {
        // User already logged in
        // console.log('req.originalUrl', req.originalUrl);
        if (req.originalUrl === '/') {

            // User is trying to visit login page after login
            return res.redirect('/dashboard'); // Redirect to dashboard or previous page
        } else {
            // Allow access to other pages
            return next();
        }
    } else {
        // User not logged in
        if (req.originalUrl === '/') {
            // Allow access to login page
            return next();
        } else {
            // Redirect to login page
            return res.redirect('/');
        }
    }
};
