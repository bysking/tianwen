import { APP_KEY } from '@/constants';
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';
import { authHeaderInterceptor, authResponseInterceptor } from './interceptor';

interface ResponseStructure {
  success?: boolean;
  data: any;
  code?: number | string;
  msg?: string;
}

export const requestConf: RequestConfig = {
  timeout: 30000,
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [authResponseInterceptor],
  errorConfig: {
    // 错误抛出
    errorThrower: (res: ResponseStructure) => {
      const { success, data, code, msg, headers } = res;
      if (code === '200' || code === 0 || success) return;
      if (!success) {
        const error: any = new Error(msg);
        error.name = 'ReqBizError';
        error.info = { code, message: msg, data, success, headers: headers };
        throw error;
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      console.log('[console] errorHandler response ', error, opts);
      if (opts?.skipErrorHandler) throw error;
      if (error['response']?.['status'] === 401) {
        console.log(`[${APP_KEY}] 权限过期，重新登录`);
        if (window[APP_KEY]?.parentProps) {
          window[APP_KEY]?.parentProps?.goLoginPage?.();
          return;
        }
      }

      if (error.name === 'ReqBizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { message: msg } = errorInfo;
          let errorMessage = msg;

          const status = error['response']?.['status'];
          // 4xx
          if ((status >= 400 && status < 500) || status === 401) {
            errorMessage = msg || '未知错误';
          }

          // 5xx
          if (status >= 500 && status < 512) {
            errorMessage = msg || '服务错误，请稍后再试';
          }
          message.error(errorMessage || msg);
        }
      } else if (error.response) {
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        message.error('没有收到响应');
      } else {
        message.error('发送请求时出了点问题');
      }
    },
  },
};
