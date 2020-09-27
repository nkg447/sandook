import { NextFunction, Request, Response } from 'express';
import fileUpload from 'express-fileupload';

import { ControllerError } from '../../core/controller/definition';
import { container } from '../../di';
import { TYPES } from '../../di/types';
import { StandardError, StandardSuccess } from '../../entity/standard-operation';
import { System } from '../../entity/system';
import ISystemService from '../../service/system';

const controller: ISystemService = container.get<ISystemService>(
  TYPES.SystemController
);

function fetch(req: Request, res: Response, next: NextFunction) {
  controller
    .fetch()
    .then((data: StandardError | System) => {
      res.send(data);
    })
    .catch((error: StandardError | System) => {
      res.status(500).send(error);
    });
}
export { fetch };
