import 'reflect-metadata';

import fs from 'fs';
import { inject, injectable } from 'inversify';
import _path from 'path';

import Config from '../../config/';
import { ControllerError, ControllerSuccess } from '../../core/controller/definition';
import { TYPES } from '../../di/types';
import { File } from '../../entity/file';
import { StandardError, StandardSuccess } from '../../entity/standard-operation';
import IFileService from '../../service/file';

@injectable()
export default class FileController implements IFileService {
  public fetch(path: string) {
    return new Promise<StandardError | File[]>(async (resolve, reject) => {
      try {
        const metaFilePath = _path.join(Config.basePath, path, Config.metaFile);
        fs.readFile(metaFilePath, (err, data) => {
          if (err) {
            reject(new ControllerError(err.message));
          }
          const result: File[] = JSON.parse(data.toString('utf8'));
          resolve(result);
        });
      } catch (err) {
        reject(new ControllerError(err.message));
      }
    });
  }
}
