const express = require('express');
const exphbs = require('express-handlebars')
const mongo = require('mongoose')
const app = express();

// connect to mongoose
mongo.connect('mongodb://localhost/keep-ideas',{useNewUrlParser:true}).then(()=>{
    console.log('mongodb connecting ……')
}).catch(err=>{
    console.log(err)
})
// load idea model
require('./models/idea')
const Idea = mongo.model('ideas')
// handlebaes middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')
// index route
app.get('/', (req, res) => {
    const title = "welcome to keep ideas"
    res.render('index', { title: title })
})
// about route
app.get('/about', (req, res) => {
    res.render('about')
})
// ideas add route
app.get('/ideas/add', (req, res) => {
    res.render('ideas/add')
})
// post idea
app.post('/ideas',(req,res)=>{
    res.send('ok')
})
const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})