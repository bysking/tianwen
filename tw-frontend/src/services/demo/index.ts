/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

import { API_PATH } from '@/constants';
import { request } from '@umijs/max';
import * as UserController from './UserController';
export default {
  UserController,
};

export const qr_login = async (params = {}) => {
  return request(API_PATH + '/qrLogin', {
    method: 'GET',
    params,
  });
};

/**
 * 用户名密码登陆
 * @param params
 * @returns
 */
export const pwd_login = async (params = {}) => {
  return request(API_PATH + '/oauth/token', {
    method: 'POST',
    params,
    data: {
      ...params,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    transformRequest: [
      // 回调中接收到请求的数据,转为键值对格式
      function (data) {
        const formData = new FormData();
        for (const it in data) {
          formData.append(it, data[it]);
        }
        return formData;
      },
    ],
  });
};
