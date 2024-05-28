import { API_HOST } from '@/constants';
import { tokenTool } from '@/utils/data-tool';
import { goLoginPage } from '@/utils/tool';

export const authHeaderInterceptor = (url: string, options: any) => {
  const token = tokenTool.getToken();

  const authHeader =
    token && token !== ''
      ? {
          'X-Token': token,
        }
      : {};

  const host = window.location.host as keyof typeof API_HOST;
  let requestUrl = `${url}`;

  // 处理内网请求
  if (url.startsWith('http')) {
    requestUrl = `${url}`;
  } else if (host.indexOf('localhost') === -1) {
    const newUrl = API_HOST[host];
    if (newUrl) {
      requestUrl = `${newUrl}${url}`;
    }
  }

  return {
    url: requestUrl,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

export const authResponseInterceptor = (response: any) => {
  if (response.status === 401) {
    goLoginPage();
  }
  return response;
};
