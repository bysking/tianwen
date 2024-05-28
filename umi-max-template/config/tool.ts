export const getEnvConfig = (env: string) => {
  const cfg = {
    local: {
      publicPath: '//localhost:8008/',
      // 开启https,确保你已经安装依赖 brew install mkcert
      // chrome://flags/#allow-insecure-localhost 开启chomre允许非安全localhost flag
      https: { http2: false },
    },
    dev: {
      base: '/tw-sub/',
      publicPath: '//dev.bysking.cc/tw-sub/',
    },
    test: {
      base: '/tw-sub/',
      publicPath: '//test.bysking.cc/tw-sub/',
    },
    prod: {
      base: '/tw-sub/',
      publicPath: '//prod.bysking.cc/tw-sub/',
    },
  };

  return cfg[env];
};
