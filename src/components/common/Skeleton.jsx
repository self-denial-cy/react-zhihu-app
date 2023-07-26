import { Skeleton as ASkeleton } from 'antd-mobile';
import PropTypes from 'prop-types';
import './scss/skeleton.scss';

export function Skeleton(props) {
  return (
    <div className="skeleton">
      <ASkeleton.Title animated />
      <ASkeleton.Paragraph lineCount={props.lineCount} animated />
      <ASkeleton.Paragraph lineCount={props.lineCount} animated />
    </div>
  );
}

Skeleton.defaultProps = {
  lineCount: 5
};

Skeleton.propTypes = {
  lineCount: PropTypes.number
};
