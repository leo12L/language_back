console.log('inicio del archivo');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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


const createUser = async (req, res) => {
    try {
        console.log('body recibido:', req.body);
        const { name, last_name, email, password } = req.body;

        if (!name || name.trim() === '' || !last_name || last_name.trim() === '' || !email || email.trim() === '' || !password || password.trim() === '') {
            return res.status(400).json({
                error: 'Todo los campos son obligatorios'
            })
        }

        const [existingUser] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )

        if (existingUser.length > 0) {
            return res.status(409).json({
                error: 'el email ya esta registrado'
            })
        }
        const passwordHash = await bcrypt.hash(password, 10);

        const[result] = await db.query(
            "INSERT INTO users (name, last_name, email, password) Values (?,?,?,?)", [name, last_name, email, passwordHash]
        );

        
        res.status(201).json({
            message: 'Usuario registrado correctamente',
            users:{
                id:result.insertId,
                name,
                last_name,
                email
            }
        })
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({
            error: 'Error al crear usuario'
        })
    }
}


const loginUser = async (req, res) =>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                error: 'Correo y contraseña obligatorios'
            })
        }


        const[user] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )

        if(user.length === 0){
            return res.status(401).json({
                error: 'Credenciales incorrectas'
            })
        }

        const useer = user[0];

        const passwordOk = await bcrypt.compare(password, useer.password);

        if(!passwordOk){
            return res.status(401).json({
                error: 'Credenciales incorrectas'
            });
        }

        const token = jwt.sign(
            {
                id: useer.id,
                email: useer.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        res.json({
            message: 'Login correcto',
            token,
            users:{
                id: useer.id,
                name: useer.name,
                email: useer.email
            }
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: 'Error al iniciar sesion'
        })
    }
}




module.exports = {
    getUsers,
    createUser,
    loginUser
}