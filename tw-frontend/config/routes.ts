export default [
  {
    path: '/login',
    layout: false,
    component: './user/Login',
  },
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