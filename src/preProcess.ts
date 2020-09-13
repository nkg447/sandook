import watch from 'node-watch';
import path from 'path';

import Config from './config/';
import { analyseAndCreateMetaFile, ensurePath } from './util/FileUtil';

const startWatch = () => {
  watch(Config.basePath, { recursive: true }, (event, fileName) => {
    if (!fileName.endsWith(Config.metaFile)) {
      analyseAndCreateMetaFile(path.dirname(fileName));
    }
  });
};

export default function preProcess() {
  ensurePath(Config.basePath);
  analyseAndCreateMetaFile(Config.basePath);
  startWatch();
}
