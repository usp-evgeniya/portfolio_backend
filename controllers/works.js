const nodemailer = require('nodemailer');
const config = require('../config.json');

module.exports.getWorks = function(req, res) {
    res.render('pages/works', {
        title: 'Мои работы',
        msg: req.query.msg
    });
}

module.exports.sendEmail = function(req, res) {
    if (!req.body.name || !req.body.email || !req.body.message) {
        return res.redirect('/works?msg=Пожалуйста, заполните все поля');
    }

    const transporter = nodemailer.createTransport(config.mail.smtp);

    const mailOptions = {
        from: `"Администратор сайта-портфолио" <usp-evgeniya@yandex.ru>`,
        to: config.mail.smtp.auth.user,
        subject: config.mail.subject,
        text: ` Пожалуйста, свяжитесь со мной! \n\n Имя: "${req.body.name}",\n e-mail: <${req.body.email}>,\n сообщение: "${req.body.message.trim()}"`
    };

    transporter.verify(function(error, success) {
        if (error) {
             console.log(error);
        } else {
             console.log('Сервер готов принять сообщение');
        }
     });

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.redirect('/works?msg=При отправке письма произошла ошибка ' + error);
            console.log(error);
        }
        res.redirect('/works?msg=Сообщение отправлено');
    });
}
