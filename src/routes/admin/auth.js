const express = require('express');
const router = express.Router();
const AuthCtrl = require('../../controllers/admin/authController')
const DashboardCtrl = require('../../controllers/admin/dashboardController')
const RolesCtrl = require('../../controllers/admin/rolesController')
const UserCtrl = require('../../controllers/admin/userController')
const checkLoggedIn = require('../../middleware/admin/checkLoggedIn');

router.get('/logout', AuthCtrl.logout)
router.get('/users', UserCtrl.userPage)
router.get('/roles', RolesCtrl.rolesPermissions)
router.get('/', checkLoggedIn, AuthCtrl.loginPage);
router.get('/dashboard', DashboardCtrl.dashboardPage)
router.get('/verifyOtp', checkLoggedIn, AuthCtrl.verifyOtp);

router.post('/sendOtp', AuthCtrl.sendOtp)
router.post('/usersList', UserCtrl.userList)
router.post('/updateUser', UserCtrl.updateUser)
router.post('/saveUserdata', UserCtrl.saveUserData)
router.post('/verifyOtpData', AuthCtrl.verifyOtpData)
router.post('/saveRoles', RolesCtrl.saveRolesPermissions)

router.delete('/delete-user/:id', UserCtrl.deleteUser);

module.exports = router;
