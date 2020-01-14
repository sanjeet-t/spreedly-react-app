import { Router } from 'express';
import loginRouter from './users/login';
import spreedlyRouter from './spreedly/spreedly';

const router = Router();

router.use('/login', loginRouter);
router.use('/spreedly', spreedlyRouter);

export = router;
