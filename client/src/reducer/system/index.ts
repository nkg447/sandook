import _path from 'path';

import { SystemAction } from '../../actions/system';
import { FETCH_SYSTEM_DATA } from '../../constants/system';
import { SystemState } from '../../types/system';

const initialSystemState: SystemState = {
  hostname: '',
  platform: '',
  totalmem: '',
  freemem: '',
  uptime: '',
  osType: ''
};

export function systemReducer(
  state: SystemState = initialSystemState,
  action: SystemAction
): SystemState {
  console.log(action);
  switch (action.type) {
    case FETCH_SYSTEM_DATA:
      return action.payload;
    default:
      return state;
  }
}
