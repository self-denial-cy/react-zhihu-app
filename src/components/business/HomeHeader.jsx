import { useMemo } from 'react';
import avatar from '../../assets/images/avatar.svg';
import './scss/home_header.scss';

export function HomeHeader(props) {
  const { today } = props;
  const time = useMemo(() => {
    const [, month, day] = today.split('-');
    const map = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
    return {
      month: map[+month] + '月',
      day
    };
  }, [today]);
  return (
    <div className="home_header">
      <div className="info">
        <div className="time">
          <span>{time.day}</span>
          <span>{time.month}</span>
        </div>
        <div className="title">知乎日报</div>
      </div>
      <div className="avatar">
        <img src={avatar} alt="用户头像" />
      </div>
    </div>
  );
}
