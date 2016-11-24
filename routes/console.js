var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/:appname', function (req, res, next) {
    if (!req.session.user) {                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }

    var appname = req.params.appname;
    var App = global.dbHandel.getModel('app');
    App.findOne({ 'applicationmember.name': req.session.user.name, "name": appname }
        , function (err, doc) {
            if (!doc) {
                res.send(404);
                return;
            }
            // docs 是查询的结果数组
            res.render('apps/console', {
                title: 'SUBAPI apps',
                app: doc, 
                user: req.session.user
            });
        });

});


/* GET category  page. */
router.get('/category/:categoryid', function (req, res, next) {
    if (!req.session.user) {                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
        return;
    }

    var categoryid = req.params.categoryid;
    var Category = global.dbHandel.getModel('category');
    Category.findOne({ '_id': categoryid }
        , function (err, doc) {
            if (!doc) {
                res.send(404);
                return;
            }
            else {

                var Api = global.dbHandel.getModel('api');
                Api.find({ 'categoryid': categoryid }, function (err, docs) {
                    if (err) {
                        res.send(500);
                        return;
                    }
                    // docs 是查询的结果数组
                    res.render('apps/category', {
                        title: 'SUBAPI apps',
                        category: doc,
                        apis: docs,
                        user: req.session.user
                    });
                });
            }

        });

});



module.exports = router;
