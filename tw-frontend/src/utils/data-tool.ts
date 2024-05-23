const tokenKey = 'tianwen_user_token';
import { history } from '@umijs/max';

export const tokenTool = {
  setToken(token: string) {
    return localStorage.setItem(tokenKey, token);
  },
  getToken() {
    return localStorage.getItem(tokenKey);
  },
  removeToken() {
    return localStorage.removeItem(tokenKey);
  },
};

export const loginOut = async () => {
  tokenTool.removeToken();
  history.replace({
    pathname: '/login',
  });
};

export const getWaterContent = (initialState: any) => {
  return initialState?.name + ' ' + initialState?.email;
};
