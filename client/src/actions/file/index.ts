import { Action, Dispatch } from 'redux';

import * as constants from '../../constants/file';
import service from '../../service/FileService';
import { File } from '../../types/file';

export interface UpdateFiles extends Action {
  type: constants.UPDATE_FILES;
  payload: {
    files: File[];
    path: string;
  };
}

export type FileAction = UpdateFiles;

export const updateFiles = (path: string) => (dispatch: Dispatch) => {
  service.getMetaData(path).then((data) =>
    dispatch({
      type: constants.UPDATE_FILES,
      payload: {
        files: data,
        path
      }
    })
  );
};
