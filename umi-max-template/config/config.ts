import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import { routes } from './routes';
import { getEnvConfig } from './tool';

const { UMI_ENV, PROXY_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {
    configProvider: {
      showSizeChanger: true,
    },
  },
  dva: {},
  request: {},
  model: {},
  access: {},
  initialState: {
    // loading: '@/components/Loading',
  },
  layout: {
    layout: 'Sub App',
    locale: false,
    siderWidth: 208,
  },
  locale: false,
  targets: {},
  routes,
  runtimePublicPath: false,
  title: false,
  ignoreMomentLocale: true,
  proxy,
  mfsu: false,
  esbuildMinifyIIFE: true,
  exportStatic: {},
  mountElementId: 'root',
  qiankun: {
    slave: {
      shouldNotModifyRuntimePublicPath: true,
    },
  },
  copy: [
    {
      from: 'lib',
      to: 'dist/lib',
    },
  ],
  ...getEnvConfig(UMI_ENV || 'prod'),
  define: {
    UMI_ENV,
    PROXY_ENV,
  },
  plugins: ['./config/plugins/plugin-html', 'umi-plugin-keep-alive'],
  headScripts: [
    'https://g.alicdn.com/IMM/office-js/1.1.15/aliyun-web-office-sdk.min.js',
  ],
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8889,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'gzip', // stat  // gzip  // parsed
  },
});
