/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 */

const proxyAPI = {
  local: 'http://localhost:7001',
  dev: 'https://dev.bysking.cc',
  test: 'https://test.bysking.cc',
  stage: 'https://stage.bysking.cc',
};

const proxyOf = (path: string, forceEnv: string) => {
  return {
    [path]: {
      // 要代理的地址
      target: proxyAPI[forceEnv],
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: { '^/api/v1': '' },
    },
  };
};

export default {
  dev: {},
  test: {},
  pre: {},
  local: {
    ...proxyOf('/api/v1', 'local'),
  },
};
