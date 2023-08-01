import routes from './routes';
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { Mask, SpinLoading, Toast } from 'antd-mobile';
import { verifyLogin } from './utils';
import { getLocal } from '../utils';
import store from '../store';
import action from '../store/action';
import styles from '../styles/modules/base.module.css';

function createRoute(routes) {
  return (
    <>
      {routes.map((item) => {
        const { path, name, children } = item;
        return (
          <Route key={name} path={path} element={<Element {...item} />}>
            {Array.isArray(children) ? createRoute(children) : null}
          </Route>
        );
      })}
    </>
  );
}

function Element(props) {
  const { component: Component, meta, path } = props;
  const { title = '知乎日报' } = meta || {};
  document.title = title;

  const [_, _set] = useState(0);
  const showLoading = verifyLogin(path);
  // 初始渲染或每次更新渲染后，校验登录态
  useEffect(() => {
    if (!showLoading) return;
    (async () => {
      const isLogin = getLocal('ilg');
      if (!isLogin) {
        Toast.show({
          icon: 'fail',
          content: '请先完成登录'
        });
        navigate(`/login?to=${path}`, {
          replace: true
        });
      } else {
        try {
          const { username, avatar } = await fetch('/api/login.json').then((res) => res.json());
          store.dispatch(action.base.setUserInfo({ username, avatar }));
          _set(Date.now()); // 获取用户信息后刷新 Element，成功渲染目标组件
        } catch (_) {}
      }
    })();
  });

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  return (
    <>
      {!showLoading ? (
        <Component navigate={navigate} location={location} params={params} searchParams={searchParams} />
      ) : (
        <Mask color="white" visible={true}>
          <div className={styles.loading}>
            <SpinLoading style={{ '--size': '64px' }} color="primary" />
          </div>
        </Mask>
      )}
    </>
  );
}

export default function RouterView() {
  return (
    <Suspense
      fallback={
        <Mask color="white" visible={true}>
          <div className={styles.loading}>
            <SpinLoading style={{ '--size': '64px' }} color="primary" />
          </div>
        </Mask>
      }
    >
      <Routes>{createRoute(routes)}</Routes>
    </Suspense>
  );
}

export function withRouter(Component) {
  return function HOC(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [searchParams] = useSearchParams();
    return <Component {...props} navigate={navigate} location={location} params={params} searchParams={searchParams} />;
  };
}
