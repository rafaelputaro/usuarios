const {check} = require('express-validator');
const {ROLES, isRole} = require('../../types/role');
const {validateFields} = require('../validateFields');
const {
    createAccessRoleBased, 
    createAccessRoleAndOwnerBased} = require('../validateAccess');
const {
    MSG_EMAIL_NOT_ENTERED,
    MSG_PASSWORD_NOT_ENTERED,
    MSG_NAME_IS_REQUIRED,
    MSG_NAME_ERROR_LENGTH,
    MSG_EMAIL_IS_REQUIRED,
    MSG_PASSWORD_ERROR_LENGTH,
    MSG_ROLE_ERROR_TYPE, 
} = require('../../messages/auth');
const {
    LENGTH_MIN_NAME,
    LENGTH_MIN_PASSWORD,
    REGEXP_NUMBERS_SYMBOLS_PASSWORD
} = require('../../models/requirements/users');

const ACCESS_GET_USERS = [ROLES.ADMINISTRATOR];
const ACCESS_CREATE_USER = [ROLES.CLIENT];
const ACCESS_UPDATE_USER = [ROLES.CLIENT, ROLES.ADMINISTRATOR];
const ACCESS_DELETE_USER = [ROLES.CLIENT, ROLES.ADMINISTRATOR];

/**
* @returns {object} Un arreglo de middlewares que checkean la longitud del nombre, la existencia de
un email, la existencia de un rol y la longitud del password y que el mismo contenga al menos un número
y un símbolo.
*/
const checkCreateUser = [
    check('name', MSG_NAME_IS_REQUIRED).not().isEmpty(),
    check('name', MSG_NAME_ERROR_LENGTH).isLength({min: LENGTH_MIN_NAME}),
    check('email', MSG_EMAIL_IS_REQUIRED).isEmail(),
    check('password', MSG_PASSWORD_ERROR_LENGTH).isLength({ min: LENGTH_MIN_PASSWORD})
        .matches(REGEXP_NUMBERS_SYMBOLS_PASSWORD),
    //check('role', MSG_ROLE_ERROR_TYPE).custom((role) => isRole(role)),
    //createAccessRoleBased(ACCESS_CREATE_USER),    
    //validateFields,
];

/**
* @returns {object} Un arreglo de middlewares que checkean la presencia de email y password.
*/
const checkLoginUser = [
    check('email', MSG_EMAIL_NOT_ENTERED).isEmail(),
    check('password', MSG_PASSWORD_NOT_ENTERED).not().isEmpty(),
    validateFields
];

/**
* @returns {object} Un arreglo de middlewares que checkean el permiso se acceso a lectura de usuarios.
*/
const checkGetUsers = [
    createAccessRoleBased(ACCESS_GET_USERS)
]

/**
* @returns {object}  Un arreglo de middlewares que checkean la longitud del nombre, la existencia de
un email, la existencia de un rol y la longitud del password y que el mismo contenga al menos un número
y un símbolo. Además chequea el acceso según propietario y rol (si es propiertario autoriza automáticamente).
*/
const checkUpdateUser = [
    check('name', MSG_NAME_ERROR_LENGTH).optional().isLength({min: LENGTH_MIN_NAME}),
    check('email', MSG_EMAIL_IS_REQUIRED).optional().isEmail(),
    check('password', MSG_PASSWORD_ERROR_LENGTH).optional().isLength({ min: LENGTH_MIN_PASSWORD})
        .matches(REGEXP_NUMBERS_SYMBOLS_PASSWORD),
    check('role', MSG_ROLE_ERROR_TYPE).custom((role) => isRole(role)
    ),
    createAccessRoleAndOwnerBased(ACCESS_UPDATE_USER),
    validateFields
];

/**
* @returns {object} Un middleware que chequea el acceso.
*/
const checkDeleteUser = [
    createAccessRoleAndOwnerBased(ACCESS_DELETE_USER),
    validateFields
];

/**
* @returns {object} Un arreglo de middlewares que checkean la presencia de email y password.
*/
const checkRevalidarToken = [
    check('email', MSG_EMAIL_NOT_ENTERED).isEmail(),
    check('password', MSG_PASSWORD_NOT_ENTERED).not().isEmpty(),
    validateFields
];

module.exports = {
    checkCreateUser,
    checkGetUsers,
    checkLoginUser,
    checkUpdateUser,
    checkDeleteUser,    
    checkRevalidarToken
}