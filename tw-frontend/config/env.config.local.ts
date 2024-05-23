// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  https: { http2: false },
  define: {
    'process.env.UMI_ENV': 'local',
  },
});
