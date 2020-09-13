import { NextFunction, Request, Response } from 'express';

import { container } from '../../di';
import { TYPES } from '../../di/types';
import { File } from '../../entity/file';
import { StandardError, StandardSuccess } from '../../entity/standard-operation';
import { PayloadError } from '../../error-handler/definition';
import IFileService from '../../service/file';

const controller: IFileService = container.get<IFileService>(
  TYPES.FileController
);

function fetch(req: Request, res: Response, next: NextFunction) {
  let path: string = '';
  if (req.query && req.query.path && typeof req.query.path === 'string') {
    path = req.query.path;
  }
  controller
    .fetch(path)
    .then((files: StandardError | File[]) => {
      if (!Array.isArray(files)) {
        files = [];
      }
      res.send(files);
    })
    .catch((error: StandardError | File[]) => {
      res.status(500).send(error);
    });
}

export { fetch };
