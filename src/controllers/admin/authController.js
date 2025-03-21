const Admin = require('../../models/admin/AdminUser');

// Render login page
const loginPage = (req, res) => {
    res.render('pages/login', { title: 'OnPoints Admin ', layout: false });
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
    res.render('pages/otp', { layout: false });
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

        console.log('Session:', req.session.admin);
        console.log('OTP verified successfully!');
        return res.redirect('/dashboard');

    } else {
        console.log('Invalid OTP. Please try again.');
        return res.redirect('/verifyOtp');
    }
};

module.exports = {
    loginPage,
    sendOtp,
    verifyOtp,
    verifyOtpData,
    logout
};
