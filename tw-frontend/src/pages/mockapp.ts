const cacheMockAppKey = 'tianwen_cacheMockAppKey';
export const getMockApp = () => {
  let appCfgLocal = JSON.parse(
    localStorage.getItem(cacheMockAppKey) || JSON.stringify({}),
  );

  //   {
  //     "projectCode": "reactApp",
  //     "appName": "reactDemo平台",
  //     "entryEnv": {
  //         "local": "//localhost:8008/",
  //         "dev": "//dev.bysking.cc/reactApp",
  //         "test": "//test.bysking.cc/reactApp",
  //         "prod": "//prod.bysking.cc/reactApp"
  //     },
  //     "menuRoute": [
  //         {
  //             "path": "/",
  //             "redirect": "/welcome"
  //         },
  //         {
  //             "name": "欢迎",
  //             "icon": "icon-shouye",
  //             "path": "/welcome"
  //         },
  //         {
  //             "path": "/mytodo",
  //             "icon": "icon-MDS-baobiaoguanli",
  //             "name": "我的待办",
  //             "routes": [
  //                 {
  //                     "path": "/mytodo/todolist",
  //                     "name": "待办事项",
  //                     "access": ""
  //                 }
  //             ]
  //         }
  //     ]
  // }
  if (!Object.keys(appCfgLocal).length) {
    return;
  }
  return appCfgLocal;
};

export const setMockApp = (data: any) => {
  localStorage.setItem(cacheMockAppKey, JSON.stringify(data));
};

export const clearApp = () => {
  localStorage.removeItem(cacheMockAppKey);
};
