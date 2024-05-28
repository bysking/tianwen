import { HOST_MAP } from '../src/constants';
const UMI_ENV = process.env.UMI_ENV;

const generalProxy = (env?: string) => ({
  // 要代理的地址
  target: HOST_MAP[env],
  changeOrigin: true,
  pathRewrite: {
    '^/api/v1': '/api/v1',
  },
});

const generalProxyInstance = generalProxy(UMI_ENV);

export default {
  '/api/v1': generalProxyInstance,
};
