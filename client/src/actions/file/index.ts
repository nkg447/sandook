import { Action } from 'redux';

import * as constants from '../../constants/file';
import { IUpdateFiles } from '../../types/file';

export interface UpdateFiles extends Action {
  type: constants.UPDATE_FILES;
  payload: IUpdateFiles;
}

export type FileAction = UpdateFiles;

export function updateFiles(path: string): UpdateFiles {
  return {
    type: constants.UPDATE_FILES,
    payload: { files: [], folders: [] }
  };
}
