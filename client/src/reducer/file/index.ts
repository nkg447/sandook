import { FileAction } from '../../actions/file';
import { NEW_FOLDER, UPDATE_FILES, UPLOAD_FILE } from '../../constants/file';
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
    default:
      return state;
  }
}
