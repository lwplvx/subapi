//use vue   appmodel.js


new Vue({
    el: '#app',
    data: {
        category: {
            name: "",
            describe: "",
            isadd: false,
        },
    },
    methods: {
        createCategory: function (appid) {
            this.category.appid = appid;
            $.ajax({
                url: '/console/createCategory',
                type: 'post',
                data: this.category,
                success: function (data, status) {
                    if (status == 'success') {
                        location.href = '/console';
                    }
                },
                error: function (data, err) {
                    location.href = 'createCategory';
                }
            });
        },
    }
})