/**
 * Event Routes
 * /api/events
 */

const { Router}  = require('express');
const router = Router();

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

// Todas las peticiones pasaran por el token despues de esta linea
router.use( validarJWT )

router.get('/', getEventos )

router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ], crearEvento )

router.put('/:id', actualizarEvento )

router.delete('/:id', eliminarEvento )

module.exports = router