const express = require('express');
const exphbs = require('express-handlebars');
const mongo = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

// connect to mongoose
mongo.connect('mongodb://localhost/keep-ideas', { useNewUrlParser: true }).then(() => {
    console.log('mongodb connecting ……')
}).catch(err => {
    console.log(err)
});
// load idea model
require('./models/idea');
const Idea = mongo.model('ideas');
// handlebaes middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// 
app.use(methodOverride('_method'))
// create application/x-www-form-urlencodeed parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// index route
app.get('/', (req, res) => {
    const title = "welcome to keep ideas"
    res.render('index', { title: title })
});
// about route
app.get('/about', (req, res) => {
    res.render('about')
});
// ideas add route
app.get('/ideas/add', (req, res) => {
    res.render('ideas/add')
});
// edit idea
app.get('/ideas/edit/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        res.render('ideas/edit', { idea: idea })
    })
});
// edit keep note
app.put('/ideas/:id',(req,res)=>{
    Idea.findOne({
        _id:req.params.id
    }).then(idea=>{
        idea.title = req.body.title;
        idea.details = req.body.details;
        idea.save()
        .then(idea=>{
            res.redirect('/ideas')
        })
    })
})
// delete idea
app.delete('/ideas/:id',(req,res)=>{
    Idea.remove({_id:req.params.id})
    .then(()=>{
        res.redirect('/ideas')
    })
})
// idea list page
app.get('/ideas', (req, res) => {
    Idea.find({})
        .then(ideas => {
            res.render('ideas/index', { ideas: ideas })
        })
});
// post idea
app.post('/ideas', (req, res) => {
    let errors = [];
    if (!req.body.title) {
        errors.push({ text: 'please add a title' })
    }
    if (!req.body.details) {
        errors.push({ text: 'Please add some details' })
    }
    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        })
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details
        }
        new Idea(newUser)
            .save()
            .then(ideas => {
                res.redirect('/ideas')
            });
    }
});
const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})