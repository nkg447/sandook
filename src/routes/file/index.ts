import { Router } from 'express';

import { download, fetch, newFolder, remove, upload } from './api';

const router = Router();

router.get('/meta', fetch);
router.get('/', download);
router.post('/', upload);
router.delete('/', remove);
router.get('/newFolder', newFolder);

export default router;
