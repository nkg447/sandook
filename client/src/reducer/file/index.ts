import { FileAction } from '../../actions/file';
import { UPDATE_FILES } from '../../constants/file';
import { FileState } from '../../types/file';

const initialFileState: FileState ={
    files: [],
    folders: []
}

export function fileReducer(state: FileState = initialFileState, action: FileAction): FileState {
  switch (action.type) {
    case UPDATE_FILES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
