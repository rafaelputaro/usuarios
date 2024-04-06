const {response} = require('express');
const jwt = require('jsonwebtoken');

const MSG_NO_TOKEN = 'No hay un token la petición';
const MSG_INVALID_TOKEN = 'Token no válido';

/**
 * Valida un token que viene por el header como "x-token" 
 */
const validateJWT = (req, res = response, next) => {
    /*
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: MSG_NO_TOKEN
        });
    }
    try {
        const {uid, name, role} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )
        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: MSG_INVALID_TOKEN
        })
    }*/
    next();
}

module.exports = {
    validateJWT,
}