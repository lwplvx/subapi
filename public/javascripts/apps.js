//use vue   appmodel.js


new Vue({
    el: '#app',
    data: {
        appmodel: {
            name: "appName",
            appurl: "appUrl",
            accessauthority: "true",
            appicon: "icon",
            describe: "describe",
            rootpath: "rootPath",
        },
    },
    methods: {
        create: function () {
            $.ajax({
                url: '/app/create',
                type: 'post',
                data: this.appmodel,
                success: function (data, status) {
                    if (status == 'success') {
                        location.href = '/app';
                    }
                },
                error: function (data, err) {
                    location.href = 'create';
                }
            });
        },
    }
})