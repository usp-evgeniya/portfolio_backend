module.exports.getAbout = function(req, res) {
    res.render('pages/about', { title: 'Обо мне' });
}