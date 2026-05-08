const { authMiddleware } = require('../config/authMiddleware');
const db = require('../config/db');



const getProfile = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM learning_profile');
        res.json(rows);
    } catch (error) {
        console.error('Error completo:', error.message);
        console.error('Error al obtener perfil:', error);
        res.status(500).json({
            error: 'Error al obtener perfiles'
        })
    }
}


const creatProfile = async (req, res) => {
    try {
        const allowedLanguages = ["ESP, EN"]
        
        
        const user_id = req.user.id


        const { motivation, languages_learning, languages_native, streak } = req.body;

        if (
            !motivation || motivation.trim() === '' ||
            allowedLanguages.includes(languages_learning) ||
            allowedLanguages.includes(languages_native) ||
            !streak) {
            return res.status(400).json({
                error: 'Todo los campos son obligatorios'
            })
        }


        

        const [result] = await db.query(
            "INSERT INTO learning_profile (motivation, language_learning, language_native, streak, users_id) VALUES (?,?,?,?,?)",
            [motivation, languages_learning, languages_native, streak, user_id]
        )

        res.status(201).json({
            message: 'Perfil creado correctamente',
            learning_profile: {
                id: result.insertId,
                motivation,
                languages_learning,
                languages_native,
                streak,
                user_id
            }
        })

    } catch (error) {
        console.error('Error al crear perfil:', error);
        res.status(500).json({
            error: 'Error al crear perfil'
        })
    }
}




module.exports = {
    getProfile,
    creatProfile
}
