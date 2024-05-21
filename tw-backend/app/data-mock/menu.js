let nemuData = [
  {
    projectCode: 'reactApp',
    appName: 'reactDemo平台',
    entryEnv: {
      local: '//localhost:8005/',
      dev: '//dev.bysking.cc/reactApp',
      test: '//test.bysking.cc/reactApp',
      prod: '//prod.bysking.cc/reactApp',
    },
    menuRoute: [
      {
        path: '/',
        redirect: '/welcome',
      },
      {
        name: '欢迎',
        icon: 'icon-shouye',
        path: '/welcome',
      },
      {
        name: '任务管理',
        path: '/task',
        routes: [
          {
            name: '任务列表',
            path: '/task/task-list',
            component: './task-list',
            access: '',
          },
          {
            name: '任务验收',
            path: '/task/task-check',
            component: './task-check',
            access: '',
          },
        ],
      },
    ],
    // menuConfigUrl: {
    //   dev: 'http://fe-task.gezhi-dev/lib/menu-config.json',
    //   test: 'http://fe-task.gezhi-test/lib/menu-config.json',
    //   prod: 'http://fe-task.gezhi-prod/lib/menu-config.json',
    // },
  },
  {
    projectCode: 'reactDemo',
    appName: 'reactDemo测试应用',
    entryEnv: {
      dev: '//dev.bysking/reactDemo',
      test: '//test.bysking/reactDemo',
      uat: '//uat.bysking/reactDemo',
      prod: '//prod.bysking/reactDemo',
      local: '//localhost:8006/',
    },
    linkApps: [
      {
        microApp: 'reactApp',
        microAppPath: '/link-reactApp',
      },
    ],
    menuRoute: [
      {
        path: '/',
      },
      {
        path: '/welcome',
        name: '欢迎页面',
        hideInMenu: true,
      },
      {
        path: '/link-reactApp/user-center',
        name: '外链应用',
        icon: 'icon-shujukanban',
        routes: [
          {
            path: '/link-reactApp/user-center/approve-center',
            name: '审批中心',
            access: ['ACCESS_CODE_1', 'ACCESS_CODE_2'],
          },
        ],
      },
    ],
    // menuConfigUrl: {
    //   dev: 'http://uranus-sub-crm.gezhi-dev-tob/lib/menu-config.json',
    //   test: 'http://uranus-sub-crm.gezhi-test-tob/lib/menu-config.json',
    //   prod: 'http://uranus-sub-crm.gezhi-prod/lib/menu-config.json',
    // },
  },
];

module.exports = nemuData;
