import * as TYPES from '../../action-types';

export const baseAction = {
  setUserInfo(info) {
    return {
      type: TYPES.BASE_USER_INFO,
      info
    };
  }
};
