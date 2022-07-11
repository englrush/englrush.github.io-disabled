const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose
    .connect('mongodb+srv://admin:admin123@cluster0.h5kmq.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log("Connected to MongoDB"))
    .catch((e) => console.log(e))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("http://localhost:5000"))

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.get('/', (req, res) => {
    const title = "Home"
    res.render('index', { title })
})

app.get('/topics', (req, res) => {
    const title = "Topics"
    res.render('topics', { title })
})

app.get('/new-topic', (req, res) => {
    const title = "New Topic"
    res.render('new-topic', { title })
})

app.use((req, res) => {
    const title = "Error"
    res
        .status(400)
        .render('error', { title })
})