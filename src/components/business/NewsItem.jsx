import { Image } from 'antd-mobile';
import { Link } from 'react-router-dom';
import './scss/news_item.scss';

export function NewsItem() {
  return (
    <div className="news_item">
      <Link to="/detail/123">
        <div className="content">
          <Image
            src="https://images.pexels.com/photos/9827181/pexels-photo-9827181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            lazy
          />
          <div className="title">斑马的条纹到底是干嘛用的？</div>
          <div className="author">作者 苏成玉</div>
        </div>
      </Link>
    </div>
  );
}
