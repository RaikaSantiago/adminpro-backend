/* Ruta: /api/hospitales */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getHospitales, postHospital, putHospital, deleteHospital } = require('../controllers/hospitales');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getHospitales);

router.post(
    '/', [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    postHospital
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    putHospital
);

router.delete('/:id', validarJWT, deleteHospital);

module.exports = router;