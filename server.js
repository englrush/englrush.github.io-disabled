const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Topic = require('./models/topic')
require('dotenv').config()

const app = express()

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((e) => console.log(e))

app.listen(process.env.PORT, () => console.log("http://localhost:" + process.env.PORT))

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    const title = "Home"
    res.render('index', { title })
})

app.get('/topics:id', (req, res) => {
    const title = "Topics"
    Topic
        .findById(req.params.id)
        .then((topic) => res.render('topic', { title, topic }))
        .catch((e) => {
            console.log(e)
            res.render('error', { title: 'Error' });
        })
})

app.delete('/topics:id', (req, res) => {
    const title = "Delete Topics"
    Topic
        .findByIdAndDelete(req.params.id)
        .then(result => {
            res.sendStatus(200)
        })
        .catch((e) => {
            console.log(e)
            res.render('error', { title: 'Error' });
        })
})

app.get('/edit:id', (req, res) => {
    const title = "Edit Topics"
    Topic
        .findById(req.params.id)
        .then((topic) => res.render('edit-topic', { title, topic }))
        .catch((e) => {
            console.log(e)
            res.render('error', { title: 'Error' });
        })
})

app.put('/edit:id', (req, res) => {
    const { title, author, text } = req.body
    const { id } = req.params
    Topic
        .findByIdAndUpdate(id, { title, author, text })
        .then(result => res.redirect(`topics${id}`))
        .catch((e) => {
            console.log(e)
            res.render(e);
        })
})

app.get('/topics', (req, res) => {
    const title = "Topics"
    Topic
        .find()
        //.sort({ createAd: 'descending' })
        .then((topics) => res.render('topics', { title, topics }))
        .catch((e) => {
            console.log(e)
            res.render(e)
        })
})

app.get('/new-topic', (req, res) => {
    const title = "New Topic"
    res.render('new-topic', { title })
})

app.post('/new-topic', (req, res) => {
    const { title, author, text } = req.body
    const topic = new Topic({ title, author, text })
    topic
        .save()
        .then((result) => res.redirect('/topics'))
        .catch((e) => {
            console.log(e)
            res
                .send(e)
                .render('error', { title: 'Error' })
        })

})

app.use((req, res) => {
    const title = "Error"
    res
        .status(400)
        .render('error', { title })
})