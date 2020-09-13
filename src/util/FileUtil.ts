import fs from 'fs';
import _path from 'path';
import { StandardError, StandardSuccess } from 'src/entity/standard-operation';

import Config from '../config/';
import { File } from '../entity/file/';

export function analyseAndCreateMetaFile(path: string): void {
  try {
    const files = fs.readdirSync(path).map((file) => _path.join(path, file));
    const metadata: File[] = [];
    files
      .filter((file) => !file.endsWith(Config.metaFile))
      .forEach((file) => {
        metadata.push(getMetaDataFromFile(file));
      });
    const metaFilePath = _path.join(path, Config.metaFile);
    fs.openSync(metaFilePath, 'w');
    fs.writeFileSync(metaFilePath, JSON.stringify(metadata));
  } catch (err) {
    console.log(err);
  }
}

export function ensurePath(path: string) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

function getMetaDataFromFile(filePath: string): File {
  const fileStats = fs.statSync(filePath);
  return fileStatsToFileEntity(filePath, fileStats);
}

function fileStatsToFileEntity(filePath: string, fileStats: fs.Stats) {
  const file: any = {};
  file.path = filePath.split(Config.basePath)[1];
  file.isDir = fileStats.isDirectory();
  return new File(file);
}
