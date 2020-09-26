import fileUpload from 'express-fileupload';
import { injectable } from 'inversify';

import { File } from '../../entity/file';
import { StandardError, StandardSuccess } from '../../entity/standard-operation';

export default interface IFileService {
  fetch: (path: string) => Promise<StandardError | File[]>;
  upload: (
    path: string,
    files: fileUpload.FileArray
  ) => Promise<StandardError | StandardSuccess>;
  download: (path: string) => Promise<StandardError | string>;
  remove: (path: string) => Promise<StandardError | StandardSuccess>;
  newFolder: (
    path: string,
    folderName: string
  ) => Promise<StandardError | StandardSuccess>;
}
