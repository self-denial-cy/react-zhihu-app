import { ErrorBlock, Button } from 'antd-mobile';
import '../styles/scss/404.scss';

export default function NotFound(props) {
  const { navigate } = props;

  return (
    <div className="not_found_view">
      <ErrorBlock status="empty" fullPage>
        <div className="not_found_action">
          <Button
            color="primary"
            onClick={() => {
              navigate(-1);
            }}
          >
            返回上一页
          </Button>
        </div>
      </ErrorBlock>
    </div>
  );
}
