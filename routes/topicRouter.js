const express = require('express')

const {
    getTopic,
    deleteTopic,
    getEditTopic,
    editTopic,
    getTopics,
    getNewTopic,
    newTopic
} = require('../controllers/topicController')

const router = express.Router()

router.get('/topics:id', getTopic)
router.delete('/topics:id', deleteTopic)
router.get('/edit:id', getEditTopic)
router.put('/edit:id', editTopic)
router.get('/topics', getTopics)
router.get('/new-topic', getNewTopic)
router.post('/new-topic', newTopic)

module.exports = router