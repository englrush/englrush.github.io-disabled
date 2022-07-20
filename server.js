const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

require('dotenv').config()

const topicRoutes = require('./routes/topicRouter')

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

app.use(topicRoutes)

app.use((req, res) => {
    const title = "Error"
    res
        .status(400)
        .render('error', { title })
})