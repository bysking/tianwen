// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  chainWebpack: function (memo) {
    memo.merge({
      optimization: {
        splitChunks: {
          chunks: 'initial',
          minSize: 30000,
          minChunks: 1,
          automaticNameDelimiter: '.',
          cacheGroups: {
            common: {
              name: 'common',
              chunks: 'all',
              test: /^.*node_modules[\\/](react|react-dom|dva).*$/,
              priority: 10,
            },
            vendors: {
              name: 'vendors',
              chunks: 'initial',
              minChunks: 1,
              test: /^.*node_modules[\\/](?!react|react-dom|dva).*$/,
              priority: 10,
            },
          },
        },
      },
    });
  },
  base: '/',
  publicPath: '//cdn.bysking/tianwen-ui/',
  define: {
    'process.env.UMI_ENV': 'dev',
  },
});
