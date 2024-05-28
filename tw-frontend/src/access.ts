// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (initialState: API.UserInfo) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  let sessionId = '1234'; // bysking:todo 登录后将用户token存放到localStorage中,然后在这里取
  return {
    hasLogin: !!sessionId,
  };
};
