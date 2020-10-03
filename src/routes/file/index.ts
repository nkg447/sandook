import { Router } from 'express';

import { download, fetch, newFolder, remove, rename, upload, uploadFromUrl } from './api';

const router = Router();

router.get('/meta', fetch);
router.get('/', download);
router.post('/', upload);
router.delete('/', remove);
router.get('/newFolder', newFolder);
router.get('/fromUrl', uploadFromUrl);
router.put('/', rename);

export default router;
