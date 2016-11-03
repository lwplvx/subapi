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
                url: '/apps/create',
                type: 'post',
                data: this.appmodel,
                success: function (data, status) {
                    if (status == 'success') {
                        location.href = '/apps';
                    }
                },
                error: function (data, err) {
                    location.href = 'create';
                }
            });
        },
    }
})