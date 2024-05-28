/**
 * 约束的类型：options (常规权限) / province （省份权限）
 */
export enum CONSTRAINT_TYPE {
  options = 'options',
}

/**
 * 权限：约束集
 */
export enum CONSTRAINT_SET {
  // 权限约束类型 vflow:options
  view = 'view', // 查看
}

/**
 * 权限 资源集id, 页面的权限ID标识
 */
export enum SOURCE_SET {
  /**
   * 首页
   */
  WELCOME_PAGE = 'WELCOME_PAGE',
}

/**
 * 权限 项目id
 */
export const ACCESS_PROJECT_ID = 'tw-sub';

export const SESSIONID_UNI_KEY = 'SESSIONID_UNI_KEY';
