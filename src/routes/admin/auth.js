const express = require('express');
const router = express.Router();
const AuthCtrl = require('../../controllers/admin/authController')
const DashboardCtrl = require('../../controllers/admin/dashboardController')
const RolesCtrl = require('../../controllers/admin/rolesController')
const checkLoggedIn = require('../../middleware/admin/checkLoggedIn');


router.get('/', checkLoggedIn, AuthCtrl.loginPage);
router.post('/send-otp', AuthCtrl.sendOtp)
router.get('/verify-otp', checkLoggedIn, AuthCtrl.verifyOtp);
router.post('/verify-otp-data', AuthCtrl.verifyOtpData)
router.get('/dashboard', DashboardCtrl.dashboardPage)
router.get('/roles', RolesCtrl.rolesPermissions)
router.post('/save-roles', RolesCtrl.saveRolesPermissions)
router.get('/logout', AuthCtrl.logout)




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
