const _import = require(`./_import_${process.env.NODE_ENV}`);

const routes = [
  {
    path: '/',
    name: 'home',
    component: _import('home'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: _import('detail'),
    meta: {
      title: '详情'
    }
  },
  {
    path: '/personal',
    name: 'personal',
    component: _import('personal'),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/store',
    name: 'store',
    component: _import('store'),
    meta: {
      title: '收藏'
    }
  },
  {
    path: '/update',
    name: 'update',
    component: _import('update'),
    meta: {
      title: '修改个人信息'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: _import('login'),
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
