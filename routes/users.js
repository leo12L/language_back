const express = require('express');
const router = express.Router();

const{
    getUsers,
    getUserById,
    createUser,
    deleteUser
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.delete('/:id', deleteUser)
console.log('cargando controllers');
module.exports = router;