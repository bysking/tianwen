import { loginOut } from '@/utils/data-tool';
import { goLoginPage } from '@/utils/tool';
import { message, message as messageApi } from 'antd';
import type { RequestConfig } from 'umi';
import { authHeaderInterceptor, authResponseInterceptor } from './interceptor';

export const requestConf: RequestConfig = {
  timeout: 10000,
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [authResponseInterceptor],
  errorConfig: {
    errorThrower(res) {
      console.log('errorThrower', res);

      const code = res.code;
      if (code === 401) {
        messageApi.error('用户token失效, 请重新登陆');
        loginOut();
        return;
      }
      if (code === 403) {
        messageApi.error('没有权限访问');
        return;
      }
      if (code === 500) {
        messageApi.error('服务器异常');
        return;
      }
      if (code === 404) {
        messageApi.error('请求地址不存在');
        return;
      }
      if (code !== 0) {
        throw new Error(res.msg);
      }
    },
    errorHandler(res: Error, opts: any) {
      if (opts?.skipErrorHandler) throw res;
      const { status, data } = res?.response;

      if (status === 401) {
        messageApi.error(data.message || '请求异常, 请稍后重试', 1);
        goLoginPage();
        return;
      }

      if (data.message) {
        return messageApi.error(data.message, 1);
      }

      message.error('请求异常, 请稍后重试', 1);
    },
  },
};
