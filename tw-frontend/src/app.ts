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
