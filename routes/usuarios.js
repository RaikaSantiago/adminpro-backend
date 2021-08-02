/* Ruta: /api/usuarios */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuario');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post(
    '/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        validarCampos
    ],
    postUsuario
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
    ],
    putUsuario
);

router.delete('/:id', validarJWT, deleteUsuario);

module.exports = router;