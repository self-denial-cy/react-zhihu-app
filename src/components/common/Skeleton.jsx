import { Skeleton as ASkeleton } from 'antd-mobile';
import './scss/skeleton.scss';

export function Skeleton() {
  return (
    <div className="skeleton">
      <ASkeleton.Title animated />
      <ASkeleton.Paragraph lineCount={5} animated />
    </div>
  );
}
