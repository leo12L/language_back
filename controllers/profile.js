const db = require('../config/db');
const objUsers = new Users();

console.log("hola inicial de controllers-profile")
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


console.log("create profile")
const creatProfile = async (req, res) => {
    try {
        if (!objUsers.loginUser) {
            const allowedLanguages = ["ESP, EN"]
            const [row] = { motivation, languages_learning, languages_native, streak } = req.body;
            if (!motivation || motivation.trim() === '' ||
                !allowedLanguages.includes(languages_learning) || allowedLanguages.trim() === '' ||
                !allowedLanguages.includes(languages_native) || allowedLanguages.trim() === '') {
                return res.status(400).json({
                    error: 'Todo los campos son obligatorios'
                })
            }

            const [result] = await db.query(
                "INSERT INTO learning_profile (mativation, languages_learning, languages_native, streak) VALUES (?,?,?,?)", [motivation, languages_learning, languages_native, streak]
            )

            res.status(201).json({
                message: 'Perfil creado correctamente',
                learning_profile: {
                    id: result.insertId,
                    motivation,
                    languages_learning,
                    languages_native
                }
            })
        } else {
            console.log(error);
            res.status(500).json({
                error: "Error inesperado"
            })
        }
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
    
};