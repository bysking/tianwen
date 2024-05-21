export enum enumEnv {
  dev = 'dev',
  test = 'test',
  prod = 'prod',
  uat = 'uat',
  local = 'local',
}

export interface typeEnumRoute {
  hideInMenu?: boolean;
  name: string;
  path: string;
  access?: string;
  icon?: string;
  iconUrl?: string;
  routes?: typeEnumRoute[];
  exact?: boolean;
  redirect?: string;
}

/** app列表类型 */
export interface typeProjectApp {
  projectCode: string;
  appName: string;
  entryEnv: Record<enumEnv, string>;
  linkApps?: {
    microApp: string;
    microAppPath: string;
  }[];
  menuRoute: typeEnumRoute[];
}
