import { Router } from 'express';

import { download, fetch, remove, upload } from './api';

const router = Router();

router.get('/meta', fetch);
router.get('/', download);
router.post('/', upload);
router.delete('/', remove);

export default router;
