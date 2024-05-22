import { defineConfig } from '@umijs/max';
import routes from './config/routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  proxy: {
    '/api/v1': {
      target: 'http://localhost:7001',
      changeOrigin: true,
      pathRewrite: { '^/api/v1': '' },
    },
  },
  request: {},
  layout: false,
  routes,
  npmClient: 'pnpm',
  qiankun: {
    master: {
      defaultErrorBoundary: '@/defaultErrorBoundary',
      defaultLoader: '@/defaultLoader',
    },
  },
});
