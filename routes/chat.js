const express = require('express');
const router = express.Router();

const{
    getChat,
    genereteChat,
} = require('../controllers/chat')

router.get('/', genereteChat);
router.post('/', getChat);



module.exports = router;