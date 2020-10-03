import {
    IsBoolean, IsNumber, IsString, MaxLength, validateSync, ValidationError
} from 'class-validator';
import { get } from 'lodash';

import { combineValidationError } from '../../core/entity';

export interface IFile {
  path: string;
  isDir: boolean;
  progress?: number;
}

export class File implements IFile {
  @IsString()
  public path: string;

  @IsBoolean()
  public isDir: boolean;

  public progress: number;

  public validate(): ValidationError[] {
    return validateSync(this);
  }

  public validateErrMsg(): string {
    return combineValidationError(this);
  }

  public setProgress(p: number): void {
    this.progress = p;
  }

  constructor(obj: object) {
    this.path = get(obj, 'path');
    this.isDir = get(obj, 'isDir');
    this.progress = 0;
  }
}
