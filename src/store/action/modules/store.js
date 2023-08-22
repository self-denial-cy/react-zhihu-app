import * as TYPES from '../../action-types';

export const storeAction = {
  queryStoreList() {
    return async (dispatch) => {
      let list = null;
      try {
        const { list: storeList } = await fetch(`${process.env.PUBLIC_URL}/api/store.json`).then((res) => res.json());
        list = storeList;
      } catch (_) {}
      dispatch({
        type: TYPES.STORE_LIST,
        list
      });
      return list;
    };
  },
  clearStoreList() {
    return {
      type: TYPES.STORE_CLEAR
    };
  },
  removeStoreItem(id) {
    return {
      type: TYPES.STORE_REMOVE,
      id
    };
  },
  addStoreItem(id) {
    return async (dispatch) => {
      try {
        const { news } = await fetch(`${process.env.PUBLIC_URL}/api/home.json`).then((res) => res.json());
        const item = news.find((_) => _.id === +id);
        if (!item) return false;
        dispatch({
          type: TYPES.STORE_ADD,
          item
        });
        return true;
      } catch (_) {}
    };
  }
};
