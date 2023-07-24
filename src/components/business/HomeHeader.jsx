import { useMemo } from 'react';
import avatar from '../../assets/images/avatar.svg';
import './scss/HomeHeader.scss';

export function HomeHeader(props) {
  const { today } = props;
  return (
    <div className="home_header">
      <div className="info">
        <div className="time">
          <span>25</span>
          <span>七月</span>
        </div>
        <div className="title">知乎日报</div>
      </div>
      <div className="avatar">
        <img src={avatar} alt="用户头像" />
      </div>
    </div>
  );
}
