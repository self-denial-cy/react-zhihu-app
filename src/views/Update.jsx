import { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Toast, ImageUploader, List, Input } from 'antd-mobile';
import action from '../store/action';
import { NavBar } from '../components';
import { delay } from '../utils';
import '../styles/scss/update.scss';

export default connect(
  (state) => state.base,
  action.base
)(function Update(props) {
  const { info, navigate, setUserInfo } = props;
  const [avatar, setAvatar] = useState([
    {
      url: info.avatar
    }
  ]);
  const [username, setUsername] = useState(info.username);

  function handleBeforeUpload(file, files) {
    if (file.size > 3 * 1024 * 1024) {
      Toast.show('头像大小不得超过 3M');
      return null;
    }
    return file;
  }

  async function handleAvatarUpload(file) {
    const code = 0;
    try {
      await delay(3000); // 这里应该是调用上传接口，得到上传后的图片地址和附加信息然后按照 ImageUploadItem 的格式返回
      if (+code !== 0) {
        Toast.show({
          icon: 'fail',
          content: '上传失败'
        });
        throw new Error('Fail to upload');
      }
      return {
        url: URL.createObjectURL(file)
      };
    } catch (_) {
      throw new Error('Fail to upload');
    }
  }

  function handleAvatarChange(items) {
    setAvatar(items);
  }

  function updateSubmit() {
    if (!avatar || !avatar.length || !avatar[0].url) {
      Toast.show('请上传头像');
      return;
    }
    if (!username || !username.trim()) {
      Toast.show('请输入用户名');
      return;
    }
    // 这里应该是调用修改个人信息的接口，成功则修改 redux 中信息并返回上一页，失败则提示
    setUserInfo({
      username,
      avatar: avatar[0].url
    });
    Toast.show({
      icon: 'success',
      content: '修改成功'
    });
    navigate(-1);
  }

  return (
    <div className="update_view">
      <NavBar title="修改个人信息" />
      <div className="view_content">
        <List mode="card">
          <List.Item
            prefix={
              <>
                <i
                  style={{
                    fontFamily: 'SimSun, sans-serif',
                    color: 'var(--adm-color-danger)',
                    fontStyle: 'normal'
                  }}
                >
                  *
                </i>
                &nbsp;
                <span>头像</span>
              </>
            }
          >
            <ImageUploader
              style={{
                '--cell-size': '60px'
              }}
              value={avatar}
              maxCount={1}
              beforeUpload={handleBeforeUpload}
              upload={handleAvatarUpload}
              onChange={handleAvatarChange}
              onDelete={() => {
                setAvatar([]);
              }}
            />
          </List.Item>
          <List.Item
            prefix={
              <>
                <i
                  style={{
                    fontFamily: 'SimSun, sans-serif',
                    color: 'var(--adm-color-danger)',
                    fontStyle: 'normal'
                  }}
                >
                  *
                </i>
                &nbsp;
                <span>用户名</span>
              </>
            }
          >
            <Input value={username} onChange={setUsername} placeholder="请输入用户名" />
          </List.Item>
        </List>
      </div>
      <div className="update_submit">
        <Button block color="primary" size="large" onClick={updateSubmit}>
          提交
        </Button>
      </div>
      <div className="blank"></div>
    </div>
  );
});
