import { HOST_MAP } from '@/constants';
import { getSessionId } from '@/utils/tool';

export const authHeaderInterceptor = (url: string, options: any) => {
  const sessionId = getSessionId();
  const requestUrl = `${HOST_MAP[UMI_ENV || 'prod']}${url}`;

  return {
    url: requestUrl,
    options: {
      ...options,
      interceptors: true,
      headers: {
        Authorition: sessionId,
      },
    },
  };
};

export const authResponseInterceptor = (response: any) => {
  return response;
};
