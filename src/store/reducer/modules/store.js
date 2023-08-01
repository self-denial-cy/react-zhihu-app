import _ from 'lodash';
import * as TYPES from '../../action-types';

const initial = {
  list: null // 收藏列表
};

export function storeReducer(state = initial, action) {
  state = _.cloneDeep(state);
  switch (action.type) {
    case TYPES.STORE_LIST:
      state.list = action.list;
      break;
    case TYPES.STORE_CLEAR:
      state.list = null;
      break;
    case TYPES.STORE_REMOVE:
      if (!state.list) return;
      state.list = state.list.filter((_) => _.id !== +action.id);
      break;
    case TYPES.STORE_ADD:
      if (!state.list) return (state.list = [action.item]);
      state.list = [...state.list, action.item];
      break;
    default:
      break;
  }
  return state;
}
