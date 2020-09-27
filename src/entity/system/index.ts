import {
    IsBoolean, IsNumber, IsString, MaxLength, validateSync, ValidationError
} from 'class-validator';
import { get } from 'lodash';

import { combineValidationError } from '../../core/entity';

export interface ISystem {
  hostname: string;
  osType: string;
  platform: string;
  uptime: string;
  totalmem: string;
  freemem: string;
}

export class System implements ISystem {
  public hostname: string;
  public osType: string;
  public platform: string;
  public uptime: string;
  public totalmem: string;
  public freemem: string;

  public validate(): ValidationError[] {
    return validateSync(this);
  }
  public validateErrMsg(): string {
    return combineValidationError(this);
  }

  constructor(obj: object) {
    this.hostname = get(obj, 'hostname');
    this.platform = get(obj, 'platform');
    this.osType = get(obj, 'osType');
    this.uptime = get(obj, 'uptime');
    this.totalmem = get(obj, 'totalmem');
    this.freemem = get(obj, 'freemem');
  }
}
