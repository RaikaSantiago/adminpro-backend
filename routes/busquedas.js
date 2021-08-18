/*Ruta: api/todo */
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getBusqueda, getDocumentosCollection } = require('../controllers/busquedas');

const router = Router();
router.get('/:busqueda', validarJWT, getBusqueda);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosCollection);

module.exports = router;