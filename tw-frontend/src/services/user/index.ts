import { request } from '@umijs/max';

/** 获取用户拥有权限的app配置列表 */
export async function getMenuConfigWithPermit() {
  return request(`/api/v1/menuConfigWithPermit`, {
    method: 'GET',
  });
}

/** 获取用户的信息 */
export async function getUserInfo() {
  return request(`/api/v1/userInfo`, {
    method: 'GET',
  });
}

/** 获取用户的角色资源配置数据 */
export async function getRoleAccess() {
  return request(`/api/v1/roleAccess`, {
    method: 'GET',
  });
}
