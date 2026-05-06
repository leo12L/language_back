const express = require('express');
const router = express.Router();

const{
    getUsers,
    createUser,
    loginUser

} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.post('/login', loginUser)

console.log('cargando controllers');
module.exports = router;