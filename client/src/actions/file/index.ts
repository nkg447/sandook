import _path from 'path';
import { Action, Dispatch } from 'redux';

import * as constants from '../../constants/file';
import service from '../../service/FileService';
import socket from '../../socket';
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

export interface CreateNewFolder extends Action {
  type: constants.NEW_FOLDER;
  payload: File;
}

export interface DeleteFile extends Action {
  type: constants.DELETE_FILE;
  payload: string;
}

export interface RenameFile extends Action {
  type: constants.RENAME_FILE;
  payload: {
    srcPath: string;
    destPath: string;
    isDir: boolean;
  };
}

export interface UploadFromUrl extends Action {
  type: constants.UPLOAD_FROM_URL;
  payload: File;
}

export type FileAction =
  | UpdateFiles
  | UploadFile
  | CreateNewFolder
  | RenameFile
  | UploadFromUrl
  | DeleteFile;

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

export const createNewFolder = (path: string, folderName: string) => (
  dispatch: Dispatch
) => {
  service.newFolder(path, folderName).then((data) =>
    dispatch({
      type: constants.NEW_FOLDER,
      payload: {
        path: _path.join(path, folderName),
        isDir: true
      }
    })
  );
};

export const deleteFile = (path: string) => (dispatch: Dispatch) => {
  service.delete(path).then((data) =>
    dispatch({
      type: constants.DELETE_FILE,
      payload: path
    })
  );
};

export const renameFile = (
  srcPath: string,
  destPath: string,
  isDir: boolean
) => (dispatch: Dispatch) => {
  service.rename(srcPath, destPath).then((data) =>
    dispatch({
      type: constants.RENAME_FILE,
      payload: {
        srcPath,
        destPath,
        isDir
      }
    })
  );
};

export const uploadFromUrl = (path: string, url: string) => (
  dispatch: Dispatch
) => {
  socket.on(
    `/download?path=${_path.join(path, _path.basename(url))}`,
    (data: File) => {
      if (data.progress && data.progress === 100) {
        data.progress = undefined;
      }
      dispatch({
        type: constants.UPLOAD_FROM_URL,
        payload: data
      });
    }
  );
  service.uploadFromUrl(path, url).then((data: File) =>
    dispatch({
      type: constants.UPLOAD_FROM_URL,
      payload: data
    })
  );
};
