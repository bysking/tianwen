import { SESSIONID_UNI_KEY } from '@/constants/accessConst';
import { getDvaApp } from '@umijs/max';

export const isQiankunEnv = () => {
  return window.__POWERED_BY_QIANKUN__;
};

export const getSessionId = (name: string = SESSIONID_UNI_KEY) => {
  try {
    const globalState = getDvaApp()?._store?.getState();
    if (globalState?.global?.token) {
      return globalState.global.token;
    }

    const sessionId = JSON.parse(localStorage.getItem(name) || '');
    return sessionId;
  } catch (_err) {
    return null;
  }
};

export const setSessionId = (sessionId: string) => {
  localStorage.setItem(SESSIONID_UNI_KEY, JSON.stringify(sessionId));
};
