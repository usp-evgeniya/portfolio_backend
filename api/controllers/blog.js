const mongoose = require('mongoose');

module.exports.getArticle = function (req, res) {
    const article = [
        {
            title: "Второй курс по веб-разработке. Неделя первая", 
            date: "30 июля 2017",
            text: "Ну что, первый курс оказался успешным) Интересно, как пройдет второй?) На неделю нам, как обычно, выдали техническое задание – подготовить три секции лендинга. Я с увлечением взялась за вёрстку – хотелось опробовать то, что изучили на первом курсе, получить первый результат. В итоге, к вечеру среды я сделала большую часть технического задания, опубликовала проект - https://usp-evgeniya.github.io/burgers/. Чуть позже внесла правки после проверки Оли (моего наставника - Ольга Болотова ) и, довольная, успокоилась) Вебинары у нас сейчас 3 раза в неделю – понедельник, среда и пятница – интенсивный процесс. И нужно внедрять в проект то, что там узнаешь, а лучше предвосхищать их, разбираться заранее. В пятницу я пропустила вебинар - была на встрече выпускников Loftschool, познакомилась, пообщалась с организаторами и учениками вживую. Ничто, конечно, не заменит живого общения!) И вот, что вы думаете, вечером вижу сообщения ребят с потока о том, что все надо переделывать – “пропадайте, выходные!” Я насторожилась, но не было возможности посмотреть, в чем же дело, да и суббота пролетела незаметно на IT конференции Konnect. А сегодня я сама весь день сидела, разбиралась с темой препроцессоров, flexbox, относительными единицами и т.д. Стала вносить новые фишки в проект, вёрстка разъехалась, теперь нужно чинить. Да, не расслабишься тут) Посмотрим теперь, что будет дальше)"
            }
    ];

    const blog = mongoose.model('blog');
    console.log(blog);

    blog.find().then(items => {
        if (!items.length) {
            res.status(200).json({articles: article});
        } else {
            res.status(200).json({articles: items});
        }
    })

};

module.exports.createArticle = function (req, res) {
    const Model = mongoose.model('blog');
    let item = new Model({
        title: req.body.title,
        date: new Date(req.body.date),
        text: req.body.text
    });

    item
        .save()
        .then(item => {
            return res
                .status(201)
                .json({status: 'Запись успешно добавлена'});
        }, err => {
            const error = Object
                .keys(err.errors)
                .map(key => err.errors[key].message)
                .join(', ');

            res
                .status(404)
                .json({status: 'При добавлении записи произошла ошибка: ' + error});
        });

};

module.exports.editArticle = function (req, res) {
    const id = req.params.id;

    let data = {
        title: req.body.title,
        date: new Date(req.body.date),
        text: req.body.text
    };

    const Model = mongoose.model('blog');

    Model
        .findByIdAndUpdate(id, { $set: data })
        .then((item) => {
            if (!!item) {
                res
                    .status(200)
                    .json({ status: 'Запись успешно обновлена' });
            } else {
                res
                    .status(404)
                    .json({ status: 'Запись в БД не обнаружена' });
            }
        })
        .catch((err) => {
            res
                .status(404)
                .json({
                    status: 'При обновлении записи произошла ошибка: ' + err
                });
        });
};

module.exports.deleteArticle = function (req, res) {
    const id = req.params.id;
    const Model = mongoose.model('blog');

    Model
        .findByIdAndRemove(id)
        .then((item) => {
            if (!!item) {
                res.status(200).json({ status: 'Запись успешно удалена' });
            } else {
                res.status(404).json({ status: 'Запись в БД не обнаружена' });
            }
        }, (err) => {
            res.status(404).json({
                status: 'При удалении записи произошла ошибка: ' + err
            });
        });
}
