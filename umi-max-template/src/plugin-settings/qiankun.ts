import { APP_KEY } from '@/constants';

export const qiankunConf = () => {
  return {
    // 应用加载之前
    async bootstrap(props: any) {
      if (props) {
        if (!window[APP_KEY]) window[APP_KEY] = {};
        window[APP_KEY].parentProps = props;
      }
    },
    // 应用 render 之前触发
    async mount(props: any) {
      if (!window[APP_KEY]) window[APP_KEY] = {};
      window[APP_KEY].parentProps = props;
    },
    // 应用卸载之后触发
    async unmount() {
      window[APP_KEY] = {};
    },
  };
};
