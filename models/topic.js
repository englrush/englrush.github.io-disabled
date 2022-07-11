const monsoose = require('mongoose')
const Schema = monsoose.Schema

const topicSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Topic = monsoose.model('Topic', topicSchema)

module.exports = Topic
