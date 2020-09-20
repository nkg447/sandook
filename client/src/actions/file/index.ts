import _path from 'path';
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

export interface UploadFile extends Action {
  type: constants.UPLOAD_FILE;
  payload: File;
}

export type FileAction = UpdateFiles | UploadFile;

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

export const uploadFile = (file: any, path: string) => (dispatch: Dispatch) => {
  let fileName = '';
  if (file.name) fileName = file.name;
  function processHandler(this: XMLHttpRequestUpload) {
    this.onprogress = (e) => {
      const newFile: File = {
        path: _path.join(path, fileName),
        isDir: false,
        progress: (e.loaded * 100) / e.total
      };
      dispatch({
        type: constants.UPLOAD_FILE,
        payload: newFile
      });
    };
    this.onloadend = (e) => {
      const newFile: File = {
        path: _path.join(path, fileName),
        isDir: false
      };
      dispatch({
        type: constants.UPLOAD_FILE,
        payload: newFile
      });
    };
  }
  service.upload(file, path, processHandler);
};
