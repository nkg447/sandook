import { injectable } from 'inversify';

import { File } from '../../entity/file';
import { StandardError, StandardSuccess } from '../../entity/standard-operation';

export default interface IFileService {
  fetch: (path: string) => Promise<StandardError | File[]>;
}
