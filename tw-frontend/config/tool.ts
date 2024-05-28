export const getEnvConfig = (env: string) => {
  const cfg = {
    local: {
      publicPath: '//localhost:8000/',
      // 开启https,确保你已经安装依赖 brew install mkcert
      // chrome://flags/#allow-insecure-localhost 开启chomre允许非安全localhost flag
      https: { http2: false },
    },
    dev: {
      base: '/tianwen-ui/',
      publicPath: '//dev.bysking.cc/tianwen-ui/',
    },
    test: {
      base: '/tianwen-ui/',
      publicPath: '//test.bysking.cc/tianwen-ui/',
    },
    prod: {
      base: '/tianwen-ui/',
      publicPath: '//prod.bysking.cc/tianwen-ui/',
    },
  };

  return cfg[env];
};
