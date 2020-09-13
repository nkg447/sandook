import { Router } from 'express';

import { fetch, upload } from './api';

const router = Router();

router.get('/', fetch);
router.post('/', upload);

export default router;
