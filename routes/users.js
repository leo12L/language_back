const express = require('express');
const router = express.Router();

const{
    getUsers,
    createUser,
    loginUser

} = require('../controllers/users');


router.get('/get_users', getUsers);
router.post('/create_user', createUser);
router.post('/login_user',loginUser)


module.exports = router;
