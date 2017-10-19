const http = require('request');

const apiOptions = {
    server: "http://localhost:3000"
}

module.exports.getBlog = function(req, res) {
    const pathApi ='/api/blog';
    const requestOptions = {
        url: apiOptions.server + pathApi,
        method: 'GET',
        json: {}
    };
    const sendObj = {title: 'Блог - статьи по веб-разработке'};
    http(requestOptions,function(error, response, body) {
        res.render('pages/blog', Object.assign(sendObj, body));    
    });

}

