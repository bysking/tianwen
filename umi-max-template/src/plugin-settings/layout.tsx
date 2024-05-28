import type { RunTimeLayoutConfig } from '@umijs/max';

export const layoutConf: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    disableContentMargin: false,
    // waterMarkProps: {
    //   content: window[APP_KEY]?.parentprops?.getUser?.()?.cnName || '',
    //   fontColor: '#0000000a',
    // },
    onPageChange: () => {},
    menu: {
      locale: false,
    },
    ...initialState?.settings,
    pure: !!window.__POWERED_BY_QIANKUN__ ? true : false,
    pageTitleRender: false,
  };
};
