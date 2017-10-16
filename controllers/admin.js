const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

module.exports.getAdmin = function(req, res) {
    res.render('pages/admin', { 
        title: 'Панель администрирования',
        msgFile: req.query.msgFile
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

//https://habrahabr.ru/post/171743/