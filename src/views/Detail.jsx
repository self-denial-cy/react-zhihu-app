import { Badge } from 'antd-mobile';
import { LeftOutline, MessageOutline, LikeOutline, StarOutline, MoreOutline } from 'antd-mobile-icons';
import '../styles/scss/detail.scss';

export default function Detail() {
  return (
    <div className="detail_view">
      <div className="content"></div>
      <div className="tab_bar">
        <div className="back">
          <LeftOutline />
        </div>
        <div className="icons">
          <Badge>
            <MessageOutline />
          </Badge>
          <Badge>
            <LikeOutline />
          </Badge>
          <span>
            <StarOutline />
          </span>
          <span>
            <MoreOutline />
          </span>
        </div>
      </div>
    </div>
  );
}
