const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const mongo = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport')    

const app = express();
// load router files
const ideas = require('./routes/ideas')
const users = require('./routes/users')
// passport config
require('./config/passport')(passport)
// connect to mongoose
mongo.connect('mongodb://localhost/keep-ideas', { useNewUrlParser: true }).then(() => {
    console.log('mongodb connecting ……')
}).catch(err => {
    console.log(err)
});

// handlebaes middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// 
app.use(methodOverride('_method'))
// create application/x-www-form-urlencodeed parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// static folder
app.use(express.static(path.join(__dirname,'public')))
// express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash());
// global variables
app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next()
});
// index route
app.get('/', (req, res) => {
    const title = "welcome to keep ideas"
    res.render('index', { title: title })
});
// about route
app.get('/about', (req, res) => {
    res.render('about')
});

// user ideas router
app.use('/ideas',ideas)
app.use('/user',users)
const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})