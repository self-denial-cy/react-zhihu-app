import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Toast } from 'antd-mobile';
import { NavBar } from '../components';
import { useCountdown } from '../hooks';
import { setLocal } from '../utils';
import action from '../store/action';
import '../styles/scss/login.scss';

export default connect(
  null,
  action.base
)(function Login(props) {
  const { setUserInfo, searchParams, navigate } = props;
  const [form] = Form.useForm();
  const { count, start } = useCountdown();
  const codeRef = useRef('');
  const [loading, setLoading] = useState(false);

  async function getCode() {
    const formData = form.getFieldsValue(true);
    if (!formData.phone) {
      Toast.show('请输入手机号');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      Toast.show('手机号格式错误');
      return;
    }
    start(30);
    try {
      const { code } = await fetch('/api/login.json').then((res) => res.json());
      Toast.show('验证码已发送');
      codeRef.current = code;
    } catch (_) {}
  }

  async function doSubmit() {
    const formData = form.getFieldsValue(true);
    if (!formData.phone) {
      Toast.show('请输入手机号');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      Toast.show('手机号格式错误');
      return;
    }
    if (!formData.code) {
      Toast.show('请输入短信验证码');
      return;
    }
    if (!/^\d{6}$/.test(formData.code)) {
      Toast.show('短信验证码格式错误');
      return;
    }
    if (codeRef.current !== formData.code) {
      Toast.show('短信验证码错误');
      form.resetFields(['code']);
      return;
    }
    try {
      setLoading(true);
      const { username, avatar } = await fetch('/api/login.json').then((res) => res.json());
      setLocal('ilg', true);
      setUserInfo({ username, avatar });
      Toast.show({
        icon: 'success',
        content: '登录成功'
      });
      const to = searchParams.get('to');
      to ? navigate(to, { replace: true }) : navigate('/');
    } catch (_) {
    } finally {
      setLoading(false);
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
        <Form.Item
          label="短信验证码"
          name="code"
          required
          extra={count === 0 ? <a onClick={getCode}>发送验证码</a> : <span>{count} s</span>}
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
      <div className="login_submit">
        <Button block loading={loading} color="primary" size="large" onClick={doSubmit}>
          提交
        </Button>
      </div>
      <div className="blank"></div>
    </div>
  );
});
