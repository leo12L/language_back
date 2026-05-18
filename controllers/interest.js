const { authMiddleware } = require('../config/authMiddleware');
const db = require('../config/db');

const getTopics = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM interest')
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener topics' })
    }
}

const createTopicNoChat = async (req, res) => {
    try {
        const { topic } = req.body;
        const users_id = req.user.id
        const [values] = await db.query(
            "SELECT * FROM learning_profile WHERE users_id = ?",
            [users_id])
        const id_learning = values[0]

        if (!topic || topic.trim() === '') {
            return res.status(400).json({
                error: 'Tema obligatorio'
            })
        }

        const [existingTopic] = await db.query(
            `SELECT * FROM interest WHERE users_id = ? 
        AND learning_profile_id = ?
        AND topic = ? `,
            [users_id, id_learning.id_learning_profile, topic]
        )


        if (existingTopic.length > 0) {
            return res.status(409).json({
                error: 'Ya se creo un tema de eso'
            })
        }


        const [result] = await db.query(
            "INSERT INTO interest (topic, users_id, learning_profile_id) VALUES (?,?,?)",
            [topic, users_id, id_learning.id_learning_profile]
        );

        res.status(201).json({
            message: 'Topic registrado correctamente',
            interest: {
                id: result.insertId,
                topic: topic,
                users_id: users_id,
                id_learning: id_learning.id_learning_profile
            }
        })
    } catch (error) {
        console.error('Error al crear topic:', error);
        res.status(500).json({
            error: 'Error al crear topic'
        })
    }

}


const selectTopic = async (req, res) => {
    try {
        const { topic } = req.body;
        const users_id = req.user.id

        
        const [values] = await db.query(
            "SELECT * FROM learning_profile WHERE users_id = ?",
            [users_id])
        const id_learning = values[0]
        

        const [select] = await db.query(
            `SELECT * FROM interest WHERE users_id = ? 
        AND learning_profile_id = ?
        AND topic = ? `,
            [users_id, id_learning.id_learning_profile, topic]
        )


        if (select.length === 0) {
            return res.status(409).json({
                error: 'No existe su tema'
            })
        }

        const key = select[0]

        res.status(201).json({
            message: "Se ingreso al tema",
            interest: {
                id: key.id_interest,
                topic: key.topic,
                users_id: key.users_id,
                learning_profile_id: key.learning_profile_id
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al iniciar sesion'
        })
    }



}


module.exports = {
    getTopics,
    createTopicNoChat,
    selectTopic
}