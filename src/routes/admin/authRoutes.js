const express = require('express');
const router = express.Router();
const AuthCtrl = require('../../controllers/admin/authController');
const DashboardCtrl = require('../../controllers/admin/dashboardController');
const RolesCtrl = require('../../controllers/admin/rolesController');
const UserCtrl = require('../../controllers/admin/userController');

// Middleware
const isAuthenticated = require('../../middleware/admin/checkLoggedIn');

// Public Routes (No middleware)
router.get('/', isAuthenticated, AuthCtrl.loginPage);
router.get('/verifyOtp', AuthCtrl.verifyOtp);
router.post('/sendOtp', AuthCtrl.sendOtp);
router.post('/verifyOtpData', AuthCtrl.verifyOtpData);

// Logout route
router.get('/logout', AuthCtrl.logout);

// Apply middleware AFTER public routes
router.use(isAuthenticated);

// Protected Routes (Need login)
router.get('/dashboard', DashboardCtrl.dashboardPage);
router.get('/users', UserCtrl.userPage);
router.get('/roles', RolesCtrl.rolesPermissions);

router.post('/usersList', UserCtrl.userList);
router.post('/updateUser', UserCtrl.updateUser);
router.post('/saveUserdata', UserCtrl.saveUserData);
router.post('/saveRoles', RolesCtrl.saveRolesPermissions);

router.delete('/delete-user/:id', UserCtrl.deleteUser);

module.exports = router;
