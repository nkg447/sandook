import { Router } from 'express';

import { fetch } from './api';

const router = Router();

router.get('/', fetch);

export default router;
