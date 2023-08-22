import { useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import avatar from '../../assets/images/avatar.svg';
import action from '../../store/action';
import { getLocal } from '../../utils';
import './scss/home_header.scss';

export const HomeHeader = connect(
  (state) => state.base,
  action.base
)(function (props) {
  const navigate = useNavigate();
  const { today, info, setUserInfo } = props;
  const time = useMemo(() => {
    const [, month, day] = today.split('-');
    const map = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
    return {
      month: map[+month] + '月',
      day
    };
  }, [today]);
  useEffect(() => {
    if (info) return;
    (async () => {
      try {
        if (!getLocal('ilg')) return;
        const { username, avatar } = await fetch(`${process.env.PUBLIC_URL}/api/login.json`).then((res) => res.json());
        setUserInfo({ username, avatar });
      } catch (_) {}
    })();
  }, []);
  return (
    <div className="home_header">
      <div className="info">
        <div className="time">
          <span>{time.day}</span>
          <span>{time.month}</span>
        </div>
        <div className="title">知乎日报</div>
      </div>
      <div
        className="avatar"
        onClick={() => {
          navigate('/personal');
        }}
      >
        <img src={info ? info.avatar : avatar} alt="用户头像" />
      </div>
    </div>
  );
});
