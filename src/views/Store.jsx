import { useEffect } from 'react';
import { connect } from 'react-redux';
import { SwipeAction, Toast } from 'antd-mobile';
import action from '../store/action';
import { NavBar, NewsItem, Skeleton } from '../components';
import '../styles/scss/store.scss';

export default connect(
  (state) => state.store,
  action.store
)(function Store(props) {
  const { list, queryStoreList, removeStoreItem } = props;

  useEffect(() => {
    (async () => {
      if (!list) {
        try {
          await queryStoreList();
        } catch (_) {}
      }
    })();
  }, []);

  async function handleRemove(action, id) {
    if (action.key === 'remove') {
      await removeStoreItem(id); // 模拟取消收藏
      Toast.show({
        icon: 'success',
        content: '已取消收藏'
      });
    }
  }

  return (
    <div className="store_view">
      <NavBar title="我的收藏" />
      <div className="view_content">
        {list ? (
          list.map((item) => {
            return (
              <SwipeAction
                key={item.id}
                rightActions={[
                  {
                    key: 'remove',
                    color: 'danger',
                    text: '取消收藏'
                  }
                ]}
                onAction={(action) => {
                  handleRemove(action, item.id);
                }}
              >
                <NewsItem info={item}></NewsItem>
              </SwipeAction>
            );
          })
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
});
