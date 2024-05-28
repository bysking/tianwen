// https://umijs.org/config/
import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './routes';
import { getEnvConfig } from './tool';

const { UMI_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {
    configProvider: {
      prefixCls: 'mainapp',
    },
  },
  initialState: {
    loading: '@/components/Loading',
  },
  request: {},
  model: {},
  access: {},
  dva: {},
  locale: {},
  targets: { browsers: 'last 2 versions, not dead, > 1%, not ie <= 10' as any },
  routes,
  runtimePublicPath: {},
  theme: {},
  title: '天问平台',
  proxy: proxy['local'],
  base: '/',
  mfsu: true,
  qiankun: {
    master: {},
    slave: {},
  },
  // headScripts: [{ src: '/node/wework/wwopen-1.2.7.js' }],
  //   plugins: ['./config/plugins/plugin-html'],
  chainWebpack(memo, { env, webpack }) {
    memo.output['chunkFilename']((pathData: any) => {
      // console.log('=', pathData.chunk.name);
      return pathData.chunk.name &&
        pathData.chunk.name.indexOf('notify-worker') >= 0
        ? 'notify-worker.js'
        : '[name].[contenthash].chunk.js';
    });
  },
  ...getEnvConfig(UMI_ENV || 'prod'),
  define: {
    UMI_ENV,
  },
});
