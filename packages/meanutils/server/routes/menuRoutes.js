/**
 * Created by arunsahni on 3/5/15.
 */

'use strict';

var menu = require('../controllers/menus');


module.exports = function (Meanutils, app, auth) {

    app.route('/meanutils')
        .get(menu.list);

    app.route('/meanutils')
        .post(auth.requiresLogin, menu.create);

    app.route('/menus/:menuId')
        .get(menu.show);

    app.route('/meanutils/:menuId')
        .get(menu.show)
        .put(menu.update);

    app.param('menuId', menu.menuByID);
};