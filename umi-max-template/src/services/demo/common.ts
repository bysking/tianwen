import { request } from '@umijs/max';
export const getBlobData = async (
  url: string,
  options?: { skipErrorHandler: boolean },
) => {
  let response = await request(url, {
    method: 'GET',
    getResponse: true,
    timeout: 20000,
    responseType: 'blob',
    ...options,
  });

  if (!response?.data) {
    return Promise.reject();
  }

  const blob = new Blob([response?.data]);
  return Promise.resolve(blob);
};

export const getWebOfficeUrl = async (fileId: string) => {
  let response = await request('/api/open/weboffice/get/token', {
    method: 'GET',
    params: {
      fileId,
    },
  });

  return response.data || {};
};

export const refreshWebOfficeUrl = async (fileId: string) => {
  let response = await request('/api/open/weboffice/refresh/token', {
    method: 'PUT',
    params: {
      fileId,
    },
  });

  return response.data || {};
};
