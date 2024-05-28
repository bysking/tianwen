// 运行时配置
import { autoFixContext } from 'react-activation';
import jsxDevRuntime from 'react/jsx-dev-runtime';
import jsxRuntime from 'react/jsx-runtime';
import { layoutConf } from './plugin-settings/layout';
import { qiankunConf } from './plugin-settings/qiankun';
import { requestConf } from './plugin-settings/request';
autoFixContext(
  [jsxRuntime, 'jsx', 'jsxs', 'jsxDEV'],
  [jsxDevRuntime, 'jsx', 'jsxs', 'jsxDEV'],
);

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

// umi layout插件[https://umijs.org/docs/max/layout-menu]
export const layout = layoutConf;

// 微服务接入 [https://umijs.org/docs/max/micro-frontend]
export const qiankun = qiankunConf();

// request适配器 [https://umijs.org/docs/max/request]
export const request = requestConf;
