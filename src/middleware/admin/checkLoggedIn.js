module.exports = (req, res, next) => {
    if (req.session.isLoggedIn) {
        // console.log('session ->', req.session)
        return res.redirect('/dashboard'); // Redirect to dashboard
    }
    next();
};
