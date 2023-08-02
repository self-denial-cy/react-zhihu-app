import { NavBar as ANavBar } from 'antd-mobile';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './scss/nav_bar.scss';

export function NavBar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  function back() {
    const to = searchParams.get('to');
    const pathname = location.pathname;
    // 未登录时点击收藏的特殊情况处理
    if (pathname === '/login' && /^\/detail\/\d+$/.test(to)) {
      navigate(to, {
        replace: true
      });
      return;
    }
    navigate(-1);
  }

  return (
    <ANavBar
      style={{
        '--height': '45px',
        '--border-bottom': '1px #eee solid'
      }}
      onBack={back}
      children={props.title}
    />
  );
}

NavBar.propTypes = {
  title: PropTypes.string.isRequired
};
