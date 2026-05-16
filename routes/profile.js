const express = require('express');
const router = express.Router();

const{
    getProfile,
    createProfile
} = require('../controllers/profile');

const { authMiddleware } = require('../config/authMiddleware');

router.get('/get_profile' ,getProfile);
router.post('/create_profile', authMiddleware ,createProfile)


module.exports = router;
