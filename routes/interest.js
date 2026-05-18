const express = require('express');
const router = express.Router();

const {
    getTopics,
    createTopicNoChat,
    selectTopic
} = require('../controllers/interest')

const { authMiddleware } = require('../config/authMiddleware');

router.get('/get_topics', getTopics);
router.post('/get_topic_unique', authMiddleware, selectTopic )
router.post('/create_topic', authMiddleware, createTopicNoChat);



module.exports = router