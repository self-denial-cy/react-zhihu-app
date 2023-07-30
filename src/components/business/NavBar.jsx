import { NavBar as ANavBar } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './scss/nav_bar.scss';

export function NavBar(props) {
  const navigate = useNavigate();

  function back() {
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
