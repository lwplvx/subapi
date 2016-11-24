var express = require('express');
var router = express.Router();

//ErrorCode  枚举
if (typeof ErrorCode == "undefined") {
    var ErrorCode = {};
    ErrorCode.Success = 0;
    ErrorCode.NotLogin = 1;
    ErrorCode.Error = 2;
    ErrorCode.Message = 3;
    ErrorCode.Other = 4;
}

function successRes(req, res) {
    var json = {
        errorCode: ErrorCode.Success,
        errorMessage: 'Success'
    };
    jsonRes(req, res, json);
}

function jsonData(req, res, data) {
    var json = {
        errorCode: ErrorCode.Success,
        errorMessage: 'Success',
        data: data
    };
    jsonRes(req, res, json);
}

function notLogin(req, res) {
    var json = {
        errorCode: ErrorCode.NotLogin,
        errorMessage: '请先登录',
    };
    jsonRes(req, res, json);
}


function errorRes(req, res, err) {
    var json = {
        errorCode: ErrorCode.Error,
        errorMessage: 'Error',
        errData: err
    };
    jsonRes(req, res, json);
}

function messageRes(req, res, message) {
    var json = {
        errorCode: ErrorCode.Message,
        errorMessage: message,
    };
    jsonRes(req, res, json);
}

function jsonRes(req, res, json) {
    req.session.error = json.errorMessage;
    res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' })
    res.end(JSON.stringify(json));
}

/* GET api/app/appID   获取一个 app对象 */
router.get('/categories/:appID', function (req, res, next) {

    //if (!req.session.user) {
    //    return notLogin(req, res);
    //} 
    var appID = req.params.appID;
    var Category = global.dbHandel.getModel('category');
    Category.find({ 'appid': appID }, function (err, docs) {
        if (err) {
            return errorRes(req, res, err);
        }
        return jsonData(req, res, docs);
    });
});


/* GET api/category/categoryId   获取一个 category 对象 */
router.get('/category/:categoryId', function (req, res, next) {

    if (!req.session.user) {
        return notLogin(req, res);
    }

    var categoryId = req.params.categoryId;
    var Category = global.dbHandel.getModel('category');
    Category.findOne({ 'id': categoryId }, function (err, docs) {
        if (err) {
            return errorRes(req, res, err);
        }
        return jsonData(req, res, doc);
    });
});

/* POST api/category/create   创建 category 对象 */
router.post('/category/create', function (req, res, next) {

    if (!req.session.user) {
        return notLogin(req, res);
    }

    var model = req.body;

    var Category = global.dbHandel.getModel('category');
    Category.findOne({ "name": model.name }, function (err, doc) {
        if (doc) {
            //提示已经存在分类 
            return messageRes(req, res, "已经存在分类");  
        } else {
            Category.create({
                appid: model.appid,
                name: model.name,
                describe: model.describe,
            }, function (err, doc) {
                if (err) {
                    return errorRes(req,res,err); 
                    console.log(err);
                } else {
                    //Category创建成功
                    successRes(req,res); 
                }
            });
        }
    });

});

module.exports = router;
