import _ from 'lodash';
import * as TYPES from '../../action-types';

const initial = {
  list: null // 收藏列表
};

export function storeReducer(state = initial, action) {
  state = _.cloneDeep(state);
  switch (action.type) {
    default:
      break;
  }
  return state;
}
