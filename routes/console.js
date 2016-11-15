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
    App.where({ 'applicationmember.name': req.session.user.name })
        .findOne({ "name": appname }, function (err, doc) {
            var Category = global.dbHandel.getModel('category');
            Category.where({ 'appid': doc._id }, function (err, docs) {
                if (err) {
                    res.render('apps/console', {
                        title: 'SUBAPI apps',
                        app: doc,
                        user: req.session.user
                    }); 
                }
                // docs 是查询的结果数组
                res.render('apps/console', {
                    title: 'SUBAPI apps',
                    app: doc,
                    categorys: docs,
                    user: req.session.user
                });
            });
        });

});


/* GET home page. */
router.post('/createCategory', function (req, res, next) {
    if (!req.session.user) {                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    var model = req.body;
    var Category = global.dbHandel.getModel('category');
    Category.findOne({ "name": model.name }, function (err, doc) {
        if (doc) {
            res.send(500);
            req.session.error = '已经存在分类！';
            console.log(err);
            //提示已经存在分类
        } else {
            Category.create({
                appid: model.appid,
                name: model.name,
                describe: model.describe,
            }, function (err, doc) {
                if (err) {
                    res.send(500);
                    console.log(err);
                } else {
                    req.session.error = 'Category创建成功！';
                    res.send(200);
                }
            });
        }
        // docs 是查询的结果数组
        res.render('apps/console', { title: 'SUBAPI apps', app: doc, user: req.session.user });
    });

});


module.exports = router;
