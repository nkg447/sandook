import { Router } from 'express';

import { download, fetch, upload } from './api';

const router = Router();

router.get('/meta', fetch);
router.get('/', download);
router.post('/', upload);

export default router;
