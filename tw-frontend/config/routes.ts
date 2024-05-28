export default [
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    name: '欢迎使用',
    icon: 'icon-huanying1',
    access: 'hasLogin',
    component: './Welcome',
  },
  {
    path: '/login',
    name: '登录',
    icon: 'icon-huanying1',
    layout: false,
    hideInMenu: true,
    component: './login',
  },
  {
    path: '/404',
    name: '迷路了',
    component: './404',
    hideInMenu: true,
  },
  {
    path: '/403',
    name: '页面未授权',
    component: './403',
    hideInMenu: true,
  },
  {
    path: '/*',
    component: './404',
  },
];
