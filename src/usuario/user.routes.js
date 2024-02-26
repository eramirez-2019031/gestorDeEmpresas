const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos.js');
const { existenteEmail, existeUsuarioById } = require('../helpers/db-validators');

const { usuarioPost, usuarioGet, usuarioDelete, usuarioLogin } = require('../usuario/user.controller.js');

const router = Router();

router.get("/", usuarioGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ]);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], usuarioDelete);


router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("contra", "La contraseña debe tener más de 6 digitos").isLength({ min: 6, }),
        check("email", "El email debe ser un email").isEmail(),
        check("email").custom(existenteEmail),
        validarCampos,
    ], usuarioPost);

router.post(
    "/login",
    [
        check('email', 'Este correo no es aceptado, pruebe otro').isEmail(),
        check('contra', 'la contraseña es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    usuarioLogin);

module.exports = router;
