const Topic = require('../models/topic')

const handleError = (res, error) => {
    console.log(error)
    res.render('error', { title: 'Error' });
}

const getTopic = (req, res) => {
    const title = "Topics"
    Topic
        .findById(req.params.id)
        .then((topic) => res.render('topic', { title, topic }))
        .catch((error) => handleError(res, error))
}

const deleteTopic = (req, res) => {
    const title = "Delete Topics"
    Topic
        .findByIdAndDelete(req.params.id)
        .then(result => res.sendStatus(200))
        .catch((error) => handleError(res, error))
}

const getEditTopic = (req, res) => {
    const title = "Edit Topics"
    Topic
        .findById(req.params.id)
        .then((topic) => res.render('edit-topic', { title, topic }))
        .catch((error) => handleError(res, error))
}

const editTopic = (req, res) => {
    const { title, author, text } = req.body
    const { id } = req.params
    Topic
        .findByIdAndUpdate(id, { title, author, text })
        .then(result => res.redirect(`topics`))
        .catch((error) => handleError(res, error))
}

const getTopics = (req, res) => {
    const title = "Topics"
    Topic
        .find()
        //.sort({ createAd: 'descending' })
        .then((topics) => res.render('topics', { title, topics }))
        .catch((error) => handleError(res, error))
}

const getNewTopic = (req, res) => {
    const title = "New Topic"
    res.render('new-topic', { title })
}

const newTopic = (req, res) => {
    const { title, author, text } = req.body
    const topic = new Topic({ title, author, text })
    topic
        .save()
        .then((result) => res.redirect('/topics'))
        .catch((error) => handleError(res, error))

}

module.exports = {
    getTopic,
    deleteTopic,
    getEditTopic,
    editTopic,
    getTopics,
    getNewTopic,
    newTopic
}