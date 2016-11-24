//use vue   appmodel.js

var app = new Vue({
    el: '#app',
    data: {
        categories: [], 
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
    }
})