const express = require('express');
const router = express.Router();
const AuthCtrl = require('../../controllers/admin/authController');
const DashboardCtrl = require('../../controllers/admin/dashboardController');
const RolesCtrl = require('../../controllers/admin/rolesController');
const UserCtrl = require('../../controllers/admin/userController');
const FleetCtrl = require('../../controllers/admin/fleetController');
const OrderCtrl = require('../../controllers/admin/orderController');
const ShipmentCtrl = require('../../controllers/admin/shipmentController');
const WarehouseCtrl = require('../../controllers/admin/warehouseController');
const ConfigrationCtrl = require('../../controllers/admin/configrationController');
const BannerCtrl = require('../../controllers/admin/bannerController');
const BlogsCtrl = require('../../controllers/admin/blogsController');

const TestimonialCtrl = require('../../controllers/admin/testimonialController');
const ContactCtrl = require('../../controllers/admin/contactUsController');
const GalleryCtrl = require('../../controllers/admin/galleryController');

// Middleware
const isAuthenticated = require('../../middleware/admin/checkLoggedIn');

// Public Routes (No middleware)
router.get('/', isAuthenticated, AuthCtrl.loginPage);
router.get('/permissionDenied', AuthCtrl.permissionDenied);
router.get('/verifyOtp', AuthCtrl.verifyOtp);
router.post('/sendOtp', AuthCtrl.sendOtp);
router.post('/usersList', UserCtrl.userList);
router.post('/saveUserdata', UserCtrl.saveUserData);
router.post('/updateUser', UserCtrl.updateUser);
router.post('/saveRoles', RolesCtrl.saveRolesPermissions)
router.post('/updateRoles', RolesCtrl.updateRolesPermissions)
router.post('/rolesManagement/editRole', RolesCtrl.editRole);
router.post("/configuration/saveSetting", ConfigrationCtrl.saveSettings);


router.post('/backendUserManagement/getList', RolesCtrl.getList);
router.delete('/delete-user/:id', UserCtrl.deleteUser);


const { appSetting, saveSettings, getSettings } = require("../../controllers/admin/configrationController");

router.get("/settings", appSetting);
router.post("/save-settings", saveSettings);
router.get("/get-settings", getSettings);


router.post('/verifyOtpData', AuthCtrl.verifyOtpData);

// Logout route
router.get('/logout', AuthCtrl.logout);

// Apply middleware AFTER public routes
// router.use(isAuthenticated);

// Protected Routes (Need login)
router.get('/dashboard', DashboardCtrl.dashboardPage);
router.get('/userManagement', UserCtrl.userPage);
router.get('/rolesManagement', RolesCtrl.rolesPermissions);
router.get('/backendUserManagement', RolesCtrl.backendUser);
router.get('/fleetManagement', FleetCtrl.fleetPage);
router.get('/orderManagement', OrderCtrl.orderPage);
router.get('/shipmentManagement', ShipmentCtrl.shipmentPage);
router.get('/warehouseManagement', WarehouseCtrl.warehousePage);
router.get('/appSetting', ConfigrationCtrl.appSetting);
router.get('/bannerManagement', BannerCtrl.bannerPage);
router.get('/blogsManagement', BlogsCtrl.blogsPage);
router.get('/testimonialManagement', TestimonialCtrl.testmonialPage);
router.get('/contactUs', ContactCtrl.contactUsPage);
router.get('/galleryManagement', GalleryCtrl.galleryPage);




module.exports = router;
