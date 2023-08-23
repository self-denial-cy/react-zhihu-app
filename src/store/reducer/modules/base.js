import _ from 'lodash';
import * as TYPES from '../../action-types';

const initial = {
  info: null // 已登录的用户信息
};

export function baseReducer(state = initial, action) {
  /**
   * ! 这里使用深拷贝克隆 state，最后整体替换有点问题，如果 state 中不止 info 一条信息且其它信息并无变动，但是通过深拷贝整体替换
   * ! 会导致那些无变动且无关的组件也会跟着一起重新渲染【这里的新老状态比较是通过 Object.is 比较的，推荐使用扩展运算符更新状态，
   * ! 只更新应该更新的状态】
   */
  // state = _.cloneDeep(state);
  switch (action.type) {
    case TYPES.BASE_USER_INFO:
      state = {
        ...state,
        info: action.info
      };
      // state.info = action.info;
      break;
    default:
      break;
  }
  return state;
}
