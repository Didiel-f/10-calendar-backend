const { getEventos, crearEvento, eliminarEvento, actualizarEvento } = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const Router = require("express");
const { check } = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");
const {isDate} = require("../helpers/isDate");
const router = Router();



// Todas validadas por JWT
router.use( validarJWT );

// Obtener eventos
router.get("/", getEventos);

// Crear evento
router.post(
    "/",
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
);
router.put(
    "/:id",
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento
);
router.delete("/:id", eliminarEvento);




module.exports = router;