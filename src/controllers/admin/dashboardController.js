// const dashboardPage = (req, res) => {
//     res.render('pages/dashboard', { title: 'OnPoints Admin ' });
// }
const dashboardPage = (req, res) => {
    res.render('pages/dashboard', {
        title: 'Dashboard',
        layout: 'layouts/main'
    });
};

module.exports = { dashboardPage };

module.exports = {
    dashboardPage
}