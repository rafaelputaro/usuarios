/*
    Rutas de Usuarios /Auth
    host + /api/auth
*/

const {Router} = require('express');
const {validateJWT} = require('../middlewares/validateJWT');
const {
    createUser, 
    loginUser, 
    updateUser, 
    deleteUser,
    getUsers, 
    revalidateToken} = require('../controllers/auth');
const {checkCreateUser,  
    checkLoginUser,
    checkUpdateUser,
    checkDeleteUser,    
    checkRevalidarToken} = require('../middlewares/checkers/users');

const router = Router();

// Crear usuario
router.post('/new', validateJWT, checkCreateUser, createUser);

// Login de usuario
router.post('/', checkLoginUser, loginUser);

// Actualizar usuario
router.put('/:id', validateJWT, checkUpdateUser, updateUser);

// Borrar usuario
router.delete('/:id', validateJWT, checkDeleteUser, deleteUser);

// Obtener usuarios
router.get('/', validateJWT, getUsers);

// Revalidar token
router.get('/renew', checkRevalidarToken, validateJWT, revalidateToken);

module.exports = router;