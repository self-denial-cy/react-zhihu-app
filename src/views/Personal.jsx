import { connect } from 'react-redux';
import { Button, List } from 'antd-mobile';
import { LikeOutline, StarOutline, DeleteOutline } from 'antd-mobile-icons';
import { NavBar } from '../components';
import action from '../store/action';
import { removeLocal } from '../utils';
import avatar from '../assets/images/avatar.svg';
import '../styles/scss/personal.scss';

export default connect((state) => state.base, { ...action.base, clearStoreList: action.store.clearStoreList })(
  function Personal(props) {
    const { navigate, location, clearStoreList, setUserInfo, info } = props;

    function logout() {
      clearStoreList();
      setUserInfo(null);
      removeLocal('ilg');
      navigate(`/login?to=${location.pathname}`, {
        replace: true
      });
    }

    return (
      <div className="personal_view">
        <NavBar title="个人中心" />
        <div className="view_content">
          <div className="topper">
            <div className="avatar">
              <img src={info ? info.avatar : avatar} alt="用户头像" />
            </div>
            <span>{info.username}</span>
          </div>
          <List mode="card">
            <List.Item prefix={<LikeOutline />} disabled>
              我点赞的
            </List.Item>
            <List.Item
              prefix={<StarOutline />}
              onClick={() => {
                navigate('/store');
              }}
            >
              我的收藏
            </List.Item>
            <List.Item prefix={<DeleteOutline />} disabled>
              回收中心
            </List.Item>
          </List>
        </div>
        <div className="logout">
          <Button block color="primary" size="large" onClick={logout}>
            退出登录
          </Button>
        </div>
        <div className="blank"></div>
      </div>
    );
  }
);
