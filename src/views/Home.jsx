import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Swiper, Image, Divider, DotLoading } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { HomeHeader, NewsItem, Skeleton } from '../components';
import '../styles/scss/home.scss';

export default function Home() {
  const [today, setToday] = useState(dayjs().format('YYYY-MM-DD'));
  const [bannerData, setBannerData] = useState([]);

  // 初始渲染完毕，向服务端请求数据
  useEffect(() => {
    (async () => {
      try {
        const { today, top_banners } = await fetch('/api/home.json').then((res) => res.json());
        setToday(today);
        setBannerData(top_banners);
      } catch (_) {}
    })();
  }, []);

  return (
    <div className="home_view">
      <HomeHeader today={today}></HomeHeader>
      <div className="swiper">
        {bannerData.length ? (
          <Swiper autoplay loop>
            {bannerData.map((item) => (
              <Swiper.Item key={item.id}>
                <Link to={`/detail/${item.id}`}>
                  <Image src={item.img} alt={item.alt} lazy />
                  <div className="desc">
                    <div className="title">{item.title}</div>
                    <div className="author">作者 {item.author}</div>
                  </div>
                </Link>
              </Swiper.Item>
            ))}
          </Swiper>
        ) : null}
      </div>
      {/* <Skeleton /> */}
      <div className="news">
        <Divider contentPosition="left">7月25日</Divider>
        <div className="list">
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
        </div>
      </div>
      <div className="loadmore">
        <DotLoading />
        <span>数据加载中</span>
      </div>
    </div>
  );
}
