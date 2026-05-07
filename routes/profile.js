const express = require('express');
const router = express.Router();

const{
    getProfile,
    creatProfile

} = require('../controllers/profile');

router.get('/', getProfile);
router.post('/', creatProfile)

console.log('cargando controllers');
module.exports = router;
