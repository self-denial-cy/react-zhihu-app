import _ from 'lodash';
import * as TYPES from '../../action-types';

const initial = {
  info: null // 已登录的用户信息
};

export function baseReducer(state = initial, action) {
  state = _.cloneDeep(state);
  switch (action.type) {
    default:
      break;
  }
  return state;
}
