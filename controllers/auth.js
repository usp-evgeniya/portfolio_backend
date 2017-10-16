module.exports.getAuth = function(req, res) {
    res.render('pages/index', { 
        title: 'Портфолио - Главная страница',
        msg: req.query.msg 
    });
}

module.exports.authorization = function(req, res) {
    if (!req.body.login || !req.body.password) {
        return res.redirect('/index?msg=Все поля обязательны к заполнению!');
    }
    res.redirect('/admin');
}