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

            // docs 是查询的结果数组
            res.render('apps/console', { title: 'SUBAPI apps', app: doc, user: req.session.user });
        });

});



module.exports = router;
