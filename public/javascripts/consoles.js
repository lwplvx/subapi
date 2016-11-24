//use vue   appmodel.js

var app = new Vue({
    el: '#app',
    data: {
        categories: [],
        category: {
            name: "",
            describe: "",
            isadd: false,
            appid: ""
        }, 
    },
    ready: function () {
        //  this.getCustomers()
    },
    methods: {
        getCategories: function (appid) {
            var _self = this;
            $.ajax({
                url: "http://localhost/api/categories/" + appid,
                type: 'get',
                success: function (data, status) {
                    if (status == 'success') {
                        //  _self.categories = data.data; 
                        // 由于函数的作用域，这里不能用this
                        _self.$set('categories', data.data)
                    }
                },
                error: function (data, err) {
                    console.log(err);
                }
            });
        },
        createCategory: function (appid) {
            this.category.appid = appid;
            var _self = this;
            $.ajax({
                url: '/api/category/create',
                type: 'post',
                data: this.category,
                success: function (data, status) {
                    if (data.errorCode == 0) {
                        _self.getCategories(appid);
                        _self.category.isadd = false;
                        _self.category.name = '';
                        _self.category.describe = '';  
                    }
                    if (status == 'success') {

                    }
                },
                error: function (data, err) {
                    //界面提示

                }
            });
        },
    }
})