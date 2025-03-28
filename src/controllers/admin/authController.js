const Admin = require('../../models/admin/adminModel');
const bcrypt = require('bcrypt');


// Render login page
const loginPage = (req, res) => {
    res.render('pages/Login/login', { title: 'OnPoints Admin ', layout: false });
};
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
            return res.redirect('/');
        }
        res.clearCookie('connect.sid'); // Clears session cookie
        res.redirect('/');
    });
};

// Send OTP function
const sendOtp = (req, res) => {
    const { mobile } = req.body;
    console.log('Request body:', req.body);

    const otp = generateOTP();
    const expiryTime = Date.now() + (5 * 60 * 1000); // 5 mins validity

    // Store in session
    req.session.otp = otp;
    req.session.otpExpiry = expiryTime;
    req.session.mobile = mobile;

    console.log(`Generated OTP: ${otp}`); // (Send via SMS in production)
    res.redirect('/verifyOtp');
};

// Render OTP page
const verifyOtp = (req, res) => {
    res.render('pages/Login/otp', { layout: false });
};

// OTP generator
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
};

// Verify OTP Data
const verifyOtpData = async (req, res) => {
    const { otp } = req.body;
    console.log('Entered OTP:', otp);

    if (!req.session.otp) {
        console.log('No OTP found. Please request a new OTP.');
        return res.redirect('/login');
    }

    if (Date.now() > req.session.otpExpiry) {
        console.log('OTP expired. Please request again.');
        return res.redirect('/login');
    }

    if (otp === req.session.otp.toString()) {
        req.session.isLoggedIn = true;

        const mobile = req.session.mobile;
        const admin = await Admin.findOne({ mobile });

        if (!admin) {
            console.log('Invalid mobile number');
            return res.redirect('/login');
        }

        // Save admin data & permissions in session
        req.session.admin = {
            _id: admin._id,
            name: admin.name,
            mobile: admin.mobile,
            permissions: admin.permissions
        };

        console.log('OTP verified successfully!');
        return res.redirect('/dashboard');

    } else {
        console.log('Invalid OTP. Please try again.');
        return res.redirect('/verifyOtp');
    }
};

const permissionDenied = (req, res) => {
    res.render('pages/Login/not_authorized');
};
const checkLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin user
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).send('Invalid email or password'); // Generic message for security
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password'); // Generic message for security
        }

        // Store necessary details in session
        req.session.admin = {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            admin_type: admin.admin_type,
            permissions: admin.permissions || [], // Ensure it's always an array
        };

        console.log(`User ${admin.email} logged in successfully`);

        return res.redirect('/dashboard');
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    loginPage,
    sendOtp,
    verifyOtp,
    verifyOtpData,
    logout,
    permissionDenied,
    checkLogin
};

