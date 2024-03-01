import { Router } from 'express';
import { check } from 'express-validator';
import { userPost, userGet } from './user.controller.js';
import { existenteEmail, existeUsuarioById } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = new Router();

router.get('/', userGet);

router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('email').custom(existenteEmail),
    check('contra', 'La contraseña es obligatoria').isLength({ min: 6 }),
    validarCampos,
  ],
  userPost
);

export default router;
