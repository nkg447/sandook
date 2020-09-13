import {
    IsBoolean, IsNumber, IsString, MaxLength, validateSync, ValidationError
} from 'class-validator';
import { get } from 'lodash';

import { combineValidationError } from '../../core/entity';

export interface IFile {
  path: string;
  isDir: boolean;
}

export class File implements IFile {
  @IsString()
  public path: string;

  @IsBoolean()
  public isDir: boolean;

  public validate(): ValidationError[] {
    return validateSync(this);
  }
  public validateErrMsg(): string {
    return combineValidationError(this);
  }

  constructor(obj: object) {
    this.path = get(obj, 'path');
    this.isDir = get(obj, 'isDir');
  }
}
