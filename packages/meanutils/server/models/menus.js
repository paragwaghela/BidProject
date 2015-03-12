/**
 * Created by arunsahni on 3/5/15.
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var menuSchema = new Schema({

    menuName: {
        type: String,
        default: '',
        trim: true,
        required: 'Name cannot be blank'
    },
    submenu: {
        type: Array,
        default: '',
        trim: true
    }

});

mongoose.model('menus', menuSchema);