const loginPage = (req, res) => {
    res.render('pages/login', { title: 'OnPoints Admin ', layout: false });

};

const sendOtp = (req, res) => {
    const { mobile } = req.body.mobile;
    console.log(req.body);
    const otp = generateOTP();
    const expiryTime = Date.now() + (5 * 60 * 1000); // 5 mins validity

    req.session.otp = otp;
    req.session.otpExpiry = expiryTime;
    req.session.mobile = mobile;

    console.log(`Generated OTP: ${otp}`); // In real app, send via SMS
    res.redirect('/verify-otp');
}

const verifyOtp = (req, res) => {
    res.render('pages/otp', { layout: false });
}

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
};

const verifyOtpData = (req, res) => {

    const { otp } = req.body;
    console.log('otp=>', otp)

    if (!req.session.otp) {
        console.log('error_msg', 'No OTP found. Please request a new OTP.');
        return res.redirect('/login');
    }

    if (Date.now() > req.session.otpExpiry) {

        console.log('error_msg', 'OTP expired. Please request again.');
        return res.redirect('/login');
    }

    if (otp === req.session.otp.toString()) {

        req.session.isLoggedIn = true;
        // console.log(req.session);

        console.log('success_msg', 'OTP verified successfully!');
        return res.redirect('/dashboard');
    } else {
        console.log('error_msg', 'Invalid OTP. Please try again.');
        return res.redirect('/verify-otp');
    }


}

module.exports = {
    loginPage, sendOtp, verifyOtp, verifyOtpData
}