const express = require('express');
const router = express.Router();

const{
    getProfile,
    creatProfile

} = require('../controllers/profile');
const { authMiddleware } = require('../config/authMiddleware');

router.get('/',getProfile);
router.post('/', authMiddleware ,creatProfile)

console.log('cargando controllers');
module.exports = router;
