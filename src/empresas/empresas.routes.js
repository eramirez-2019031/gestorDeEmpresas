import { Router } from 'express';
import { check } from 'express-validator';
import { empresaPost, empresaGet } from './empresas.controller.js';
import { existenteEmpresa } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = new Router();

router.get('/', empresaGet);

router.post(
  '/',
  [
    check('nombreE').custom(existenteEmpresa),
    check('nivelImpacto', 'El nivel de impacto es obligatorio').not().isEmpty(),
    check('años', 'Los años de la empresa son obligatorios').not().isEmpty(),
    validarCampos,
  ],
  empresaPost
);

export default router;
