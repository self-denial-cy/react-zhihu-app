import { useState, useEffect, useMemo } from 'react';
import { flushSync } from 'react-dom';
import { connect } from 'react-redux';
import { Badge, Toast } from 'antd-mobile';
import { LeftOutline, MessageOutline, LikeOutline, StarOutline, MoreOutline, StarFill } from 'antd-mobile-icons';
import { Skeleton } from '../components';
import action from '../store/action';
import { getLocal } from '../utils';
import '../styles/scss/detail.scss';

export default connect((state) => state, { ...action.base, ...action.store })(function Detail(props) {
  const {
    navigate,
    setUserInfo,
    location,
    store: { list },
    queryStoreList,
    params,
    addStoreItem,
    removeStoreItem
  } = props;
  let {
    base: { info: userInfo }
  } = props;
  const [info, setInfo] = useState(null);
  // 根据收藏列表和当前 params 中的 id 比对，判断当前文章是否已经被收藏
  const isStore = useMemo(() => {
    if (!list) return false; // 未获取到收藏列表，默认当前文章未被收藏
    return list.some((_) => _.id === +params.id);
  }, [list, params]);

  useEffect(() => {
    (async () => {
      const { content, css } = await fetch('/api/detail.json').then((res) => res.json());
      flushSync(() => {
        setInfo(content);
        handleStyle(css);
      });
      // 在这里可以获取到动态添加的 DOM
      // console.log(document.querySelector('.DailyHeader'));
    })();

    return () => {
      // 组件销毁时移除动态添加的样式表
      const links = document.querySelectorAll('.dynamic_style_link');
      if (!links || !links.length) return;
      links.forEach((_) => document.head.removeChild(_));
    };
  }, []);

  function handleStyle(css) {
    css = css || [];
    css.forEach((_) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = _;
      link.className = 'dynamic_style_link';
      document.head.appendChild(link);
    });
  }

  useEffect(() => {
    (async () => {
      if (!userInfo && getLocal('ilg')) {
        try {
          const { username, avatar } = await fetch('/api/login.json').then((res) => res.json());
          setUserInfo({ username, avatar });
          userInfo = { username, avatar };
        } catch (_) {}
      }
      if (userInfo && !list) {
        console.log(await queryStoreList());
      }
    })();
  }, []);

  async function handleStore() {
    if (!userInfo) {
      Toast.show({
        icon: 'fail',
        content: '请先完成登录'
      });
      navigate(`/login?to=${location.pathname}`, {
        replace: true
      });
      return;
    }
    // 收藏或取消收藏
    if (isStore) {
      await removeStoreItem(params.id); // 模拟取消收藏
      Toast.show({
        icon: 'success',
        content: '已取消收藏'
      });
      return;
    }
    if (!(await addStoreItem(params.id))) return; // 模拟添加收藏
    Toast.show({
      icon: 'success',
      content: '收藏成功'
    });
  }

  return (
    <div className="detail_view">
      {/* 类似 Vue 的 v-html */}
      <div className="content">{info ? <div dangerouslySetInnerHTML={{ __html: info }}></div> : <Skeleton />}</div>
      <div className="tab_bar">
        <div
          className="back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <LeftOutline />
        </div>
        <div className="icons">
          <Badge content="999+" style={{ '--right': '-24%' }}>
            <MessageOutline />
          </Badge>
          <Badge content="999+" style={{ '--right': '-24%' }}>
            <LikeOutline />
          </Badge>
          <span onClick={handleStore}>{isStore ? <StarFill color="#F0CE4A" /> : <StarOutline />}</span>
          <span>
            <MoreOutline color="#bbb" />
          </span>
        </div>
      </div>
      <div className="blank"></div>
    </div>
  );
});
