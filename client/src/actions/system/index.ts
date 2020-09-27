import _path from 'path';
import { Action, Dispatch } from 'redux';

import * as constants from '../../constants/system';
import service from '../../service/SystemService';
import { System } from '../../types/system';

export interface FetchSystemData extends Action {
  type: constants.FETCH_SYSTEM_DATA;
  payload: System;
}
export type SystemAction = FetchSystemData;

export const fetchSystemData = () => (dispatch: Dispatch) => {
  service.getSystemData().then((data) =>
    dispatch({
      type: constants.FETCH_SYSTEM_DATA,
      payload: data
    })
  );
};
