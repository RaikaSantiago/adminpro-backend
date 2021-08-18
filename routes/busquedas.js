const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getBusqueda } = require('../controllers/busquedas');

const router = Router();

router.get('/:busqueda', validarJWT, getBusqueda);

module.exports = router;