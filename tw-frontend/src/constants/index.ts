export const DEFAULT_NAME = 'tianwen';
export const INDEX_PATH = '/';
export const LOGIN_PATH = '/login';

export const gotoUrl =
  'https://passport.feishu.cn/suite/passport/oauth/authorize?client_id=""&response_type=code&state=STATE&redirect_uri=';

export const getRedirectUrl = () => {
  return window.location.origin + '/bysking/login';
};

export const HOST_MAP = {
  local: 'https://dev.bysking.com',
  dev: 'http://dev.bysking.com',
  test: 'http://test.bysking.com',
  prod: 'http://prod.dev.bysking.com',
};

export const API_HOST = {
  'dev.bysking.cc': HOST_MAP.dev,
  'test.bysking.cc': HOST_MAP.test,
  'prod.bysking.com': HOST_MAP.prod,
};

export const API_PATH = '/api/v1';
