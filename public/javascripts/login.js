//use vue   login.js


new Vue({
  el: '#app',
  data: {loginuser:{
      username:"",
      password:"",
  },
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue.js' },
      { text: 'Build Something Awesome' }
    ]
  },
    methods:{
        register_link:function(){
            location.href = 'register';
         },
        login:function(){ 
           $.ajax({ 
                url:'/login',
                type:'post',
                data: this.loginuser,
                success: function(data,status){ 
                    if(status == 'success'){ 
                      location.href = 'app';
                    }
                },
                error: function(data,status){ 
                    if(status == 'error'){ 
                        location.href = 'login';
                    }
                }
            });
      },
  }
})