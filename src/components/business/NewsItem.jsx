import { Image } from 'antd-mobile';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './scss/news_item.scss';

export function NewsItem(props) {
  const { info } = props;
  if (!info) return null;
  return (
    <div className="news_item">
      <Link
        to={{
          pathname: `/detail/${info.id}`
        }}
      >
        <div className="content">
          <Image src={info.img} lazy />
          <div className="title">{info.title}</div>
          <div className="author">作者 {info.author}</div>
        </div>
      </Link>
    </div>
  );
}

NewsItem.defaultProps = {
  info: null
};

NewsItem.propTypes = {
  info: PropTypes.object
};
