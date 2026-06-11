/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de usuarios
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@mail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login correcto
 *       401:
 *         description: Credenciales inválidas
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Registrar usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - documento
 *               - nombres
 *               - apellido
 *               - email
 *               - password
 *             properties:
 *               documento:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellido:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 */
import express from 'express';

import {loginController,registerController} from '../../controllers/auth.controller.js';
import {registerValidator,loginValidator} from '../../middlewares/auth.validator.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

router.post('/login',loginValidator,validate,loginController);
router.post('/register',registerValidator,validate,registerController);

export default router;