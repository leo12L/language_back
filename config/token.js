const jwt = require('jsonwebtoken')
const generateToken = (user) =>
    jwt.sign({
        id: user.id,
        email: user.email
    },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );

const verifyToken =(generateToken)=>{
    try{
        jwt.verify(generateToken, envs.SECRET_PASSWORD_KEY)
        return true
    }
    catch(error){
        return false
    }
}


module.exports = {
    generateToken,
    verifyToken
    
}