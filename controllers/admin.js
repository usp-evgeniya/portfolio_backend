module.exports.getAdmin = function(req, res) {
    res.render('pages/admin', { title: 'Панель администрирования' });
}