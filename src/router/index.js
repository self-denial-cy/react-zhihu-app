import routes from './routes';
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Suspense } from 'react';
import { Mask, SpinLoading } from 'antd-mobile';
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
  const { component: Component, meta } = props;
  const { title = '知乎日报' } = meta || {};
  document.title = title;
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const searchParams = useSearchParams();
  return <Component navigate={navigate} location={location} params={params} searchParams={searchParams} />;
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
    const searchParams = useSearchParams();
    return <Component {...props} navigate={navigate} location={location} params={params} searchParams={searchParams} />;
  };
}
