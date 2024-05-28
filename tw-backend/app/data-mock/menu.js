let nemuData = [
  {
    projectCode: 'reactApp',
    appName: 'reactApp平台',
    entryEnv: {
      local: '//localhost:8008/',
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
        path: '/mytodo',
        icon: 'icon-MDS-baobiaoguanli',
        name: '我的待办',
        routes: [
          {
            path: '/mytodo/todolist',
            name: '待办事项',
            access: '',
          },
          {
            path: '/collect-mgr/CollectPlan',
            name: '采集计划管理',
            access: 'COLLECT_PLANMANAGEMENT',
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
      local: '//localhost:8008/',
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
        path: '/link-reactApp/mytodo',
        name: '外链应用',
        icon: 'icon-shujukanban',
        routes: [
          {
            path: '/link-reactApp/mytodo/todolist',
            name: '待办外链',
            access: ['ACCESS_CODE_1', 'ACCESS_CODE_2'],
          },
          {
            path: '/link-reactApp/mytodo/todolist2',
            name: '中心',
            access: ['ACCESS_CODE_1', 'ACCESS_CODE_3'],
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
