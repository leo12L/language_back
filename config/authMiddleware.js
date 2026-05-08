const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  // 1. Obtener el token del encabezado "Authorization"
  const authHeader = req.headers.authorization;

  

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, autorización denegada' });
  }

  // Separar "Bearer" del token real
  const token = authHeader.split(' ')[1];

  try {
    // 2. Verificar el token
   

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded:', decoded); 
    console.log(decoded.id)


    

    // 3. Añadir los datos del usuario a la solicitud (req)
    req.user = decoded;

    // 4. Continuar a la ruta
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' });
  }
};


module.exports = {
  authMiddleware
}