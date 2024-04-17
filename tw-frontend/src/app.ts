// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  // 获取用户的app列表，app中包含路由
  return { name: '@umijs/max' };
}

// export const layout = ({ initialState }) => {
//   return {
//     logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
//     menu: {
//       locale: false,
//       params: {
//         userId: initialState?.currentUser?.userid,
//       },
//       request: async (params, defaultMenuData) => {
//         // initialState.currentUser 中包含了所有用户信息
//         // const menuData = await fetchMenuData(); // 接口获取菜单信息
//         console.log(1234567);

//         return [
//           {
//             path: '/product',
//             name: '产品管理',
//             routes: [
//               { path: '/product', redirect: 'product/list' },
//               {
//                 path: '/product/list',
//                 name: '产品列表',
//               },
//               {
//                 path: '/product/new',
//                 name: '新建产品',
//               },
//             ],
//           },
//         ];
//       },
//     },
//   };
// };

// src/app.ts
export const qiankun = async () => {
  return {
    apps: [
      {
        name: 'app1',
        entry: '//localhost:7000/',
      },
      {
        name: 'app2',
        entry: '//localhost:7002/',
      },
    ],
    routes: [
      {
        path: '/app1',
        microApp: 'app1',
      },
      {
        path: '/app2',
        microApp: 'app2',
      },
    ],
    lifeCycles: {
      // 只会触发一次，加载时间较长
      // props 为当前正在加载的 子应用的配置信息
      beforeLoad: (props: unknown) => {
        // 自定义 loading
        console.log('beforeLoad...');
      },
      beforeMount: (props: unknown) => {
        console.log('beforeMount', props);
      },
      afterMount: (props: unknown) => {
        // 删除 loading
        console.log('afterMount', props);
      },
      afterUnmount: (props: unknown) => {
        console.log('afterMount', props);
      },
    },
    prefetch: false,

    // 子应用的html入口字符串
    getTemplate: (tpl: string): string => {
      return tpl;
    },

    // 可以排除CDN资源、字体文件、图片等静态资源的请求,减轻qiankun的工作负担。
    excludeAssetFilter: (url: string) => url.includes('monaco-editor'),
  };
};
