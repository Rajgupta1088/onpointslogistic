const express = require('express');
const router = express.Router();
const AuthCtrl = require('../../controllers/admin/authController')
const DashboardCtrl = require('../../controllers/admin/dashboardController')
const RolesCtrl = require('../../controllers/admin/rolesController')
const UserCtrl = require('../../controllers/admin/userController')
const checkLoggedIn = require('../../middleware/admin/checkLoggedIn');


router.get('/', checkLoggedIn, AuthCtrl.loginPage);
router.post('/send-otp', AuthCtrl.sendOtp)
router.get('/verify-otp', checkLoggedIn, AuthCtrl.verifyOtp);
router.post('/verify-otp-data', AuthCtrl.verifyOtpData)
router.get('/dashboard', DashboardCtrl.dashboardPage)
router.get('/roles', RolesCtrl.rolesPermissions)
router.post('/save-roles', RolesCtrl.saveRolesPermissions)
router.get('/logout', AuthCtrl.logout)

router.get('/users', UserCtrl.userPage)
router.post('/save-userdata', UserCtrl.saveUserData)
router.post('/users/list', UserCtrl.userList)






module.exports = router;
