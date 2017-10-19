const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const http = require('request');

const apiOptions = {
    server: "http://localhost:3000"
};

module.exports.getAdmin = function(req, res) {
    res.render('pages/admin', { 
        title: 'Панель администрирования',
        msgFile: req.query.msgFile,
        msgBlog: req.query.msgBlog
    });
}

module.exports.imgLoad = function(req, res) {
    let form = new formidable.IncomingForm();
    let uploadDir = 'public/img/content/works';
    let fileName = path.join(uploadDir,'work.png');
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.uploadDir = path.join(process.cwd(), uploadDir);


    form.parse(req, function(err, fields, files) {
        if (err) {
          return res.redirect('/admin?msgFile=Не удалось загрузить изображение');
        }
        if (!fields.project) {
          fs.unlink(files.photo.path);
          return res.redirect('/admin?msgFile=Не указано название проекта!');
        }
        if (!fields.techs) {
            fs.unlink(files.photo.path);
            return res.redirect('/admin?msgFile=Не указаны технологии!');
          }

        fs.rename(files.photo.path, fileName, function (err) {
            if (err) {
                console.log(err);
                fs.unlink(fileName);
                fs.rename(files.photo.path, fileName);
            }

            res.redirect('/admin?msgFile=Изображение успешно загружено');

        });

    });

}

module.exports.addArticle = function(req, res) {
    const pathApi ='/api/blog';
    const requestOptions = {
        url: apiOptions.server + pathApi,
        method: 'POST',
        json: {
            title: req.body.title,
            date: req.body.date,
            text: req.body.text
        }
    };

    http(requestOptions,function(error, response, body) {
        res.redirect('/admin?msgBlog=' + body.status);    
    });

}

//https://habrahabr.ru/post/171743/