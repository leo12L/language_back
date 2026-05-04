console.log('inicio del archivo');
const db = require('../config/db')

const getUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error('Error completo:', error.message);
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({
            error: 'Error al obtener usuarios'
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [rows] = await db.query('SELECT * FROM users WHERE id_users = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            })
        }

        if (!id) {
            return res.status(400).json({
                error: 'ID inválido'
            });
        }
        res.json(rows[0])
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({
            error: 'Error al obtener usuario'
        })
    }
}

const createUser = async (req, res) => {
    try {
        console.log('body recibido:', req.body);
        const { name, last_name, email, password } = req.body;

        if (!name || name.trim() === '' || !last_name || last_name.trim() === '' || !email || email.trim() === '' || !password || password.trim() === '') {
            return res.status(400).json({
                error: 'Todo los campos son obligatorios'
            })
        }
        const [result] = await db.query('INSERT INTO users (name, last_name, email, password) Values (?,?,?,?)', [name, last_name, email, password]);
        const [newUser] = await db.query('SELECT * FROM users Where id_users = ? ', [result.insertId])

        res.status(201).json(newUser[0])
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({
            error: 'Error al crear usuario'
        })
    }
}


const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const [existing] = await db.query('SELECT * FROM users WHERE id_users = ?', [id]);

        if (existing.length === 0) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            })
        }

        await db.query('DELETE FROM users WHERE id =?', [id])
        res.json({
            message: 'Usuario eliminado',
            user: existing[0]
        })

    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({
            error: 'Error al eliminar usuario'
        })
    }
}

console.log('getUsers:', typeof getUsers);
module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser
}