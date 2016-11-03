


module.exports = { 
    user:{ 
        name:{type:String,required:true},
        password:{type:String,required:true}
    },
    app:{ 
        name:{type:String,required:true}, 
        appurl:{type:String,required:true}, 
        accessauthority:{type:Boolean,required:false}, 
        appicon:{type:Image,required:false}, 
        describe:{type:String,required:false}, 
        rootpath:{type:String,required:false}, 
        applicationmember:{type:user,required:false},
    }
};