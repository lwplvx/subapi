var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    var App = global.dbHandel.getModel('app');
    App.find({ 'applicationmember.name': req.session.user.name }, function (err, docs) {

        // docs 是查询的结果数组
        res.render('apps/index', { title: 'SUBAPI apps', apps: docs,user:req.session.user });
    });

});

/* GET register page. */
router.route("/create").get(function (req, res) {    
     if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    res.render("apps/create", { title: 'SUBAPI create app',user:req.session.user });
}).post(function (req, res) {
    //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    var App = global.dbHandel.getModel('app');
    var model = req.body;
    App.findOne({ name: model.name }, function (err, doc) {   // 同理 /login 路径的处理方式
        if (err) {
            res.send(500);
            req.session.error = '网络异常错误！';
            console.log(err);
        } else if (doc) {
            req.session.error = 'app名称已存在！';
            res.send(500);
        } else {
            App.create({                             // 创建一组user对象置入model
                name: model.name,
                appurl: model.appurl,
                accessauthority: model.accessauthority,
                describe: model.describe,
                rootpath: model.rootpath,
                applicationmember: req.session.user,
            }, function (err, doc) {
                if (err) {
                    res.send(500);
                    console.log(err);
                } else {
                    req.session.error = 'App创建成功！';
                    res.send(200);
                }
            });
        }
    });
});



module.exports = router;
