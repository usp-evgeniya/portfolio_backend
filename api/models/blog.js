'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    BlogSchema = new Schema({
        title: {
            type: String,
            required: [true, 'Укажите заголовок статьи']
        },
        date: {
            type: Date,
            default: Date.now,
            required: [true, 'Укажите дату публикации']
        },
        text: {
            type: String,
            required: [true, 'Укажите содержимое статьи']
        }
    });

mongoose.model('blog', BlogSchema);