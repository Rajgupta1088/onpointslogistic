const dashboardPage = (req, res) => {
    res.render('pages/dashboard', { title: 'OnPoints Admin ' });
}

module.exports = {
    dashboardPage
}