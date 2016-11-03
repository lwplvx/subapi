//use vue   register.js


new Vue({
    el: '#app',
    data: {
        registeruser: {
            username: "",
            password: "",
            password1: "",
            passworderror: false
        },
        todos: [
            { text: 'Learn JavaScript' },
            { text: 'Learn Vue.js' },
            { text: 'Build Something Awesome' }
        ]
    },
    methods: {
        login_link: function () {
            location.href = 'login';
        },
        register: function () {
            if (this.registeruser.password !== this.registeruser.password1) {
                this.registeruser.passworderror = true;
                return false;
            }

            $.ajax({
                url: '/register',
                type: 'post',
                data: this.registeruser,
                success: function (data, status) {
                    if (status == 'success') {
                        location.href = 'login';
                    }
                },
                error: function (data, err) {
                    location.href = 'register';
                }
            });
        },
    }
})