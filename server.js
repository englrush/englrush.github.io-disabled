const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose
    .connect('mongodb+srv://admin:admin123@cluster0.h5kmq.mongodb.net/?retryWrites=true&w=majority')
    .then((res) => console.log("Connected to MongoDB"))
    .catch((e) => console.log(e))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("http://localhost:5000"))
