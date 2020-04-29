const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Leer el token del header
    const token = req.header('X-AUTH-TOKEN');
    // Revisar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No hay un token, permiso no válido.' });
    }
    // Validar el token
    try {
        const tokenDecrypted = jwt.verify(token, process.env.SECRET);
        req.user = tokenDecrypted.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido.' });
    }
};
