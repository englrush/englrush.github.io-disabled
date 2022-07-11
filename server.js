const express = require('express')
const mongoose = require('mongoose')
const Topic = require('./models/topic')

const app = express()

mongoose
    .connect('mongodb+srv://admin:admin123@cluster0.h5kmq.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log("Connected to MongoDB"))
    .catch((e) => console.log(e))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("http://localhost:5000"))

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    const title = "Home"
    res.render('index', { title })
})

app.get('/topics', (req, res) => {
    const title = "Topics"
    Topic
        .find()
        .sort({ createAd: -1 })
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
        //.then(res.render('topics', {title: 'Error', topics}))
        .then((result) => res.redirect('/topics'))
        .catch((e) => {
            console.log(e)
            res.send(e)
            //res.render('error', { title: 'Error' })
        })

})

app.use((req, res) => {
    const title = "Error"
    res
        .status(400)
        .render('error', { title })
})