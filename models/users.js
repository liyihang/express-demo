// use mongoose models
const mongoose = require('mongoose');
const scheme = mongoose.Schema;
// create ideaScheme 
const UserScheme = new scheme({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    ctime:{
        type:Date,
        default:Date.now()
    }
});
mongoose.model('users',UserScheme)