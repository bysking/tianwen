// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    pure: true, // bysking:todo 本地环境设置false, 内嵌乾坤则设置true
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

// bysking:todo 添加基座的props类型定义
export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    // console.log('主应用传给微应用的 props：', props);
    console.log("app1 bootstrap", props);
  },
  // 应用 render 之前触发
  async mount(props: any) {
    console.log("app1 mount", props);
    // 若需要全局使用，可以绑定到 window 上
    window.qiankunProps = props;
  },
  // 应用卸载之后触发
  async unmount(prop: any) {
    console.log("app1 unmount", props);
  },
};