const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, autorización denegada' });
  }

  const token = authHeader.split(' ').filter(Boolean)[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded
    next();

  } catch (error) {
    console.log("Error en JWT", error)
    return res.status(401).json({message:error.message})
  }
};


module.exports = {
  authMiddleware
}   