
const dashboardPage = (req, res) => {
    res.render('pages/Dashboard/dashboard', {
        title: 'Dashboard',
        layout: 'layouts/main'
    });
};

module.exports = { dashboardPage };

module.exports = {
    dashboardPage
}