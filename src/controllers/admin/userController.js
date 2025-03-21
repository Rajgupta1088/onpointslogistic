const User = require('../../models/admin/User');

const userList = async (req, res) => {

    try {
        let search = req.body.search?.value || '';
        let start = parseInt(req.body.start) || 0;
        let length = parseInt(req.body.length) || 10;

        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { mobile: { $regex: search, $options: 'i' } }
                ]
            };
        }

        let totalRecords = await User.countDocuments();
        let filteredRecords = await User.countDocuments(query);
        let users = await User.find(query).skip(start).limit(length);

        res.json({
            draw: req.body.draw,
            recordsTotal: totalRecords,
            recordsFiltered: filteredRecords,
            data: users // must be array of objects matching columns
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const userPage = (req, res) => {
    res.render('pages/Users/users');
}

const saveUserData = async (req, res) => {
    try {
        const { name, email, mobile, gender, status } = req.body;
        await User.create({ name, email, mobile, gender, status });
        res.redirect('/users');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving user');
    }
};

const editUserForm = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('user_form', { user });
}

const editUser = async (req, res) => {

    const { name, email, mobile, gender, dob } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, email, mobile, gender, dob });
    res.redirect('/users');

}

const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
}

module.exports = { userPage, saveUserData, userList }



