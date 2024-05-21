// 运行时配置

import { useState } from 'react';
import { getMockApp } from './pages/mockapp';
import { getMenuConfigWithPermit } from './services/user';
import { typeProjectApp } from './types';
import { getEnv, getSubAppMenuCfg } from './utils/tool';

let projectApps: typeProjectApp[] = [];

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  projectApps: typeProjectApp[];
  curApp: typeProjectApp | undefined;
}> {
  return { projectApps, curApp: undefined };
}

// src/app.ts
export const qiankun = async () => {
  const resData = await getMenuConfigWithPermit();
  projectApps = resData.data as typeProjectApp[];

  const env = getEnv();
  const apps = getSubAppMenuCfg(resData.data, env);

  const mockAppData = getMockApp();
  let mockAppList = [mockAppData].filter(Boolean);

  return {
    apps: [
      // 子应用和入口
      // {
      //   name: 'app1',
      //   entry: '//localhost:8008/',
      // },
      ...apps,
      ...mockAppList,
    ],
    routes: [
      // 路由path和子应用的关系
      // {
      //   path: '/app1',
      //   microApp: 'app1',
      // },
      ...apps,
      ...mockAppList,
    ],
    lifeCycles: {
      // 只会触发一次，加载时间较长
      // props 为当前正在加载的 子应用的配置信息
      beforeLoad: (props: unknown) => {
        // 自定义 loading
        // console.log('beforeLoad...');
      },
      beforeMount: (props: unknown) => {
        // console.log('beforeMount', props);
      },
      afterMount: (props: unknown) => {
        // 删除 loading
        // console.log('afterMount', props);
      },
      afterUnmount: (props: unknown) => {
        // console.log('afterMount', props);
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

export function useQiankunStateForSlave() {
  const [masterState, setMasterState] = useState('Hello World');

  return {
    masterState,
    setMasterState,
  };
}
