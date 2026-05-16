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


const createProfile = async (req, res) => {
    try {
        const allowedLanguages = ["ESP", "EN"]
                
        const users_id = req.user.id 
        

        const { language_learning, language_native } = req.body;

        if (
            !allowedLanguages.includes(language_learning) ||
            !allowedLanguages.includes(language_native)
        ) {
            return res.status(400).json({
                error: 'Todo los campos son obligatorios'
            })
        }

        const [result] = await db.query(
            "INSERT INTO learning_profile ( language_learning, language_native, users_id) VALUES (?,?,?)",
            [language_learning, language_native, users_id]
        )

        


        res.status(201).json({
            message: 'Perfil creado correctamente',
            learning_profile: {
                id: result.insertId,
                language_learning,
                language_native,
                users_id
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
    createProfile,

}
