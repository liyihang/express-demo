const express = require('express')
const router = express.Router()
const mongo = require('mongoose');
// load idea model
require('../models/idea');
const Idea = mongo.model('ideas');
// ideas add route
router.get('/add', (req, res) => {
    res.render('ideas/add')
});
// edit idea
router.get('/edit/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        res.render('ideas/edit', { idea: idea })
    })
});
// edit keep note
router.put('/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        idea.title = req.body.title;
        idea.details = req.body.details;
        idea.save()
            .then(idea => {
                res.redirect('/ideas')
            })
    })
})
// delete idea
router.delete('/:id', (req, res) => {
    Idea.remove({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg','Video idea removed')
            res.redirect('/ideas')
        })
})
// idea list page
router.get('/', (req, res) => {
    Idea.find({})
        .then(ideas => {
            res.render('ideas/index', { ideas: ideas })
        })
});
// post idea
router.post('/', (req, res) => {
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
module.exports = router