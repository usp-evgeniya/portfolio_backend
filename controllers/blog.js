module.exports.getBlog = function(req, res) {
    res.render('pages/blog', { title: 'Блог - статьи по веб-разработке' });
}