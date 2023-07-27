import { Badge } from 'antd-mobile';
import { LeftOutline, MessageOutline, LikeOutline, StarOutline, MoreOutline, StarFill } from 'antd-mobile-icons';
import '../styles/scss/detail.scss';

export default function Detail(props) {
  const { navigate } = props;
  return (
    <div className="detail_view">
      <div className="content"></div>
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
          <span>
            <StarFill color="#F0CE4A" />
            {/* <StarOutline /> */}
          </span>
          <span>
            <MoreOutline color="#bbb" />
          </span>
        </div>
      </div>
      <div className="blank"></div>
    </div>
  );
}
