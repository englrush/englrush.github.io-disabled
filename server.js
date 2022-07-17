const express = require('express')
const mongoose = require('mongoose')
const Topic = require('./models/topic')
require('dotenv').config()

const app = express()

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((e) => console.log(e))

const PORT = process.env.PORT
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
        .sort({ createAd: 1 })
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
            res.send(e)
            res.render('error', { title: 'Error' })
        })

})

app.use((req, res) => {
    const title = "Error"
    res
        .status(400)
        .render('error', { title })
})