const express = require('express');
const router = express.Router();
const AuthCtrl = require('../../controllers/admin/authController')
const DashboardCtrl = require('../../controllers/admin/dashboardController')
const checkLoggedIn = require('../../middleware/admin/checkLoggedIn');


router.get('/', checkLoggedIn, AuthCtrl.loginPage);
router.post('/send-otp', AuthCtrl.sendOtp)
router.get('/verify-otp', checkLoggedIn, AuthCtrl.verifyOtp);
router.post('/verify-otp-data', AuthCtrl.verifyOtpData)
router.get('/dashboard', DashboardCtrl.dashboardPage)




// Logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.redirect('/dashboard'); // Redirect back safely
        }
        res.redirect('/login');
    });
});

module.exports = router;
