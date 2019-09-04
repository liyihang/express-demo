const express = require('express')
const router = express.Router()
// login route
router.get('/login',(req,res)=>{
    res.render('users/login');
});
// register route
router.get('/register',(req,res)=>{
    res.render('users/register');
});
module.exports = router