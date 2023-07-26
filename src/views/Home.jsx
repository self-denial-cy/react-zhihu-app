import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Swiper, Image, Divider, DotLoading } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { HomeHeader, NewsItem, Skeleton } from '../components';
import '../styles/scss/home.scss';

export default function Home() {
  const [today, setToday] = useState(dayjs().format('YYYY-MM-DD'));
  const [bannerData, setBannerData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const loadMore = useRef(null);

  // 初始渲染完毕，向服务端请求数据
  useEffect(() => {
    (async () => {
      try {
        const { today, top_banners, news } = await fetch('/api/home.json').then((res) => res.json());
        setToday(today);
        setBannerData(top_banners);
        newsData.push({
          date: today,
          list: news
        });
        setNewsData([...newsData]);
      } catch (_) {}
    })();
  }, []);

  // 初始渲染完毕，设置监听器，实现触底加载更多
  useEffect(() => {
    const loadMoreEl = loadMore.current;
    let io = new IntersectionObserver(async (change) => {
      const { isIntersecting } = change[0];
      if (isIntersecting) {
        // 加载更多
        try {
          const { today, news } = await fetch('/api/home.json').then((res) => res.json());
          newsData.push({
            date: today,
            list: news
          });
          setNewsData([...newsData]);
        } catch (_) {}
      }
    });
    io.observe(loadMoreEl);
    return () => {
      io.unobserve(loadMoreEl);
      io = null;
    };
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
                  <Image src={item.img} lazy />
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
      {!newsData.length ? (
        <Skeleton />
      ) : (
        <>
          {newsData.map((item, index) => (
            <div className="news" key={index}>
              {index !== 0 ? <Divider contentPosition="left">{dayjs(item.date).format('MM月DD日')}</Divider> : null}
              <div className="list">
                {item.list.map((cur, idx) => (
                  <NewsItem info={{ ...cur, idx }} key={idx} />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
      <div className="load_more" ref={loadMore} style={{ display: !newsData.length ? 'none' : 'block' }}>
        <DotLoading />
        <span>数据加载中</span>
      </div>
    </div>
  );
}
