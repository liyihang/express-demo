// use mongoose models
const mongoose = require('mongoose');
const scheme = mongoose.Schema;
// create ideaScheme 
const ideaScheme = new scheme({
    title:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    ctime:{
        type:Date,
        default:Date.now()
    }
});
mongoose.model('ideas',ideaScheme)