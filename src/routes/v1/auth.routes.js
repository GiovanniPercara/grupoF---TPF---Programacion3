import express from 'express';

import {loginController,registerController} from '../../controllers/auth.controller.js';
import {registerValidator,loginValidator} from '../../middlewares/auth.validator.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

router.post('/login',loginValidator,validate,loginController);
router.post('/register',registerValidator,validate,registerController);

export default router;