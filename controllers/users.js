const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../config/token');

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
        const { name, last_name, email, password } = req.body;

        if (!name || name.trim() === '' || !last_name || last_name.trim() === '' || !email || email.trim() === '' || !password || password.trim() === '')
            {
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
            "INSERT INTO users (name, last_name, email, password) VALUES (?,?,?,?)", 
                                [name, last_name, email, passwordHash]
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
         console.log('Body recibido:', { email, password });

        if(!email || !password){
            return res.status(400).json({
                error: 'Correo y contraseña obligatorios'
            })
        }


        const [existingUser] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )
 
        if(existingUser.length === 0){
            return res.status(401).json({
                error: 'Credenciales incorrectas'
            })
        }
        
        const key = existingUser[0];

        const passwordOk = await bcrypt.compare(password, key.password);
         
        

        console.log('UserControll-Password ok:', passwordOk);

        if(!passwordOk){
            return res.status(401).json({
                error: 'Credenciales incorrectas'
            });
        }

        const token = generateToken({id:key.id_users, email: key.email})

        res.json({
            message: 'Login correcto',
            token,
            user:{
                id: key.id_users,
                name: key.name,
                email: key.email
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