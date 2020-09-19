import { FileAction } from '../../actions/file';
import { UPDATE_FILES } from '../../constants/file';
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
  switch (action.type) {
    case UPDATE_FILES:
      const { files, path } = action.payload;
      return {
        ...state,
        path,
        files: files.filter((file) => !file.isDir),
        folders: files.filter((file) => file.isDir)
      };
    default:
      return state;
  }
}
