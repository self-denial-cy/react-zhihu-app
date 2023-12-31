import Home from '../views/Home'; // ! react-activation 实现组件 keepalive 会与异步路由冲突，导致组件页面白屏

const _import = require(`./_import_${process.env.NODE_ENV}`);
// const _import = require('./_import_production');

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
      cache: true
    }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: _import('Detail'),
    meta: {
      title: '详情'
    }
  },
  {
    path: '/personal',
    name: 'personal',
    component: _import('Personal'),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/store',
    name: 'store',
    component: _import('Store'),
    meta: {
      title: '收藏'
    }
  },
  {
    path: '/update',
    name: 'update',
    component: _import('Update'),
    meta: {
      title: '修改个人信息'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: _import('Login'),
    meta: {
      title: '登录/注册'
    }
  },
  {
    path: '*',
    name: '404',
    component: _import('404'),
    meta: {
      title: '页面未找到'
    }
  }
];

export default routes;
