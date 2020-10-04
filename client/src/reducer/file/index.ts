import _path from 'path';

import { FileAction } from '../../actions/file';
import {
    DELETE_FILE, NEW_FOLDER, RENAME_FILE, UPDATE_FILES, UPLOAD_FILE, UPLOAD_FROM_URL
} from '../../constants/file';
import { FileState } from '../../types/file';

const initialFileState: FileState = {
  files: [],
  folders: [],
  path: window.location.pathname
};

export function fileReducer(
  state: FileState = initialFileState,
  action: FileAction
): FileState {
  console.log(action);
  switch (action.type) {
    case UPDATE_FILES:
      const { files, path } = action.payload;
      return {
        ...state,
        path,
        files: files.filter((file) => !file.isDir),
        folders: files.filter((file) => file.isDir)
      };
    case UPLOAD_FILE:
      return {
        ...state,
        files: [
          ...state.files.filter((file) => file.path !== action.payload.path),
          action.payload
        ]
      };
    case NEW_FOLDER:
      return {
        ...state,
        folders: [
          ...state.folders.filter((file) => file.path !== action.payload.path),
          action.payload
        ]
      };
    case DELETE_FILE:
      return {
        ...state,
        folders: [
          ...state.folders.filter((file) => file.path !== action.payload)
        ],
        files: [...state.files.filter((file) => file.path !== action.payload)]
      };
    case RENAME_FILE:
      const newState = { ...state };
      const sameParent =
        _path.dirname(action.payload.srcPath) ===
        _path.dirname(action.payload.destPath);

      if (action.payload.isDir) {
        newState.folders = state.folders.filter(
          (file) => file.path !== action.payload.srcPath
        );
        if (sameParent) {
          newState.folders.push({ path: action.payload.destPath, isDir: true });
        }
      } else {
        newState.files = state.files.filter(
          (file) => file.path !== action.payload.srcPath
        );
        if (sameParent) {
          newState.files.push({ path: action.payload.destPath, isDir: false });
        }
      }
      return newState;
    case UPLOAD_FROM_URL:
      return {
        ...state,
        files: [
          ...state.files.filter((file) => file.path !== action.payload.path),
          action.payload
        ]
      };
    default:
      return state;
  }
}
