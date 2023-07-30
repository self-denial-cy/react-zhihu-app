import { Form, Input, Button, Toast } from 'antd-mobile';
import { NavBar } from '../components';
import '../styles/scss/login.scss';

export default function Login() {
  const [form] = Form.useForm();

  function doSubmit() {
    const formData = form.getFieldsValue(true);
    if (!formData.phone) {
      Toast.show('请输入手机号');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      Toast.show('手机号格式错误'); // TODO 调整 Toast 组件的样式
      return;
    }
  }

  return (
    <div className="login_view">
      <NavBar title="登录/注册" />
      <Form
        form={form}
        hasFeedback={false}
        layout="horizontal"
        mode="card"
        initialValues={{
          phone: '',
          code: ''
        }}
      >
        <Form.Item label="手机号" name="phone" required>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="短信验证码" name="code" required extra={<a>发送验证码</a>}>
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
      <div className="login_submit">
        <Button block color="primary" size="large" onClick={doSubmit}>
          提交
        </Button>
      </div>
      <div className="blank"></div>
    </div>
  );
}
