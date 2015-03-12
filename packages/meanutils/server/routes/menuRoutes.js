/**
 * Created by arunsahni on 3/5/15.
 */

'use strict';

var menu = require('../controllers/menus');


module.exports = function (Meanutils, app, auth) {

    app.route('/meanutils')
        .get(menu.list);
    app.route('menus/:menuId').get(menu.read);

    // app.param('menuId', menu);
};