import { INDEX_PATH, LOGIN_PATH } from '@/constants';
import {
  enumEnv,
  permissionTypeApp,
  typeEnumRoute,
  typeProjectApp,
} from '@/types';
import { history } from '@umijs/max';

export const goWelcomePage = () => {
  history.replace(INDEX_PATH);
};

export const goLoginPage = () => {
  history.replace(LOGIN_PATH);
};

export const getEnv: () => enumEnv = () => {
  const hostStr = window?.location.host;

  // test.bysking.com
  // dev.bysking.com
  // prod.bysking.com
  // localhost
  // cpx:todo 看下是怎么处理好一点直接通过路由还是说通过process.env构建环境注入的变量
  const envStr = hostStr.split('.')[0];

  if (envStr.indexOf('localhost') !== -1) {
    return enumEnv.local;
  }
  return envStr as enumEnv;
};

/** 子应用菜单格式化
 * 为了子应用隔离，和路由正确渲染，将子应用的路径前缀拼接上子应用的projectCode
 */
export const processSubAppMenuItem = (
  item: typeEnumRoute,
  nameSpace: string,
): typeEnumRoute => {
  const {
    icon: iconName,
    iconUrl,
    path,
    redirect,
    exact = true,
    access,
    ...otherProps
  } = item;
  const renderIcon = iconName ? iconName : iconUrl;

  const pathPrefix = nameSpace;

  const hideInMenu =
    otherProps.hideInMenu ??
    (item?.routes &&
      item?.routes?.length > 0 &&
      item.routes?.findIndex((route: typeEnumRoute) => !route.hideInMenu) ===
        -1);

  const newItem = {
    ...otherProps,
    exact,
    path: `/${pathPrefix}${!path || path === '/' ? '' : path}`,
    icon: renderIcon,
    redirect: redirect && `/${nameSpace}${redirect === '/' ? '' : redirect}`,
    routes:
      item.routes &&
      item.routes.map((subMenu: any) =>
        processSubAppMenuItem(subMenu, nameSpace),
      ),
    access,
    hideInMenu,
  };

  return newItem;
};

export const filterRouteByPermission = (
  projectCode: string,
  rooteMenu: typeEnumRoute[],
  permissionProject: permissionTypeApp[],
) => {
  if (!projectCode || !rooteMenu) {
    return [];
  }

  let targetAppPermission = permissionProject.find(
    (item: permissionTypeApp) => item.projectCode === projectCode,
  );

  let resourceAccessMap = (targetAppPermission?.resourceList || []).reduce(
    (resMap, cur) => {
      // reactApp:TASK_LIST => TASK_LIST
      let resourceKey = cur.resourceCode.split(':')?.[1];
      // @ts-ignore
      resMap[resourceKey] = 1;
      return resMap;
    },
    {},
  );

  const filterFn = (list: typeEnumRoute[], accessMap: any) => {
    return list.filter((item) => {
      // 处理子节点过滤
      if (item.routes?.length) {
        item.routes = filterFn(item.routes, accessMap);
      }

      // 处理当前节点，未配置权限则展示
      if (!item.access) {
        return true;
      }
      // 数组为空数组，也展示菜单
      if (Array.isArray(item.access) && !item.access.length) {
        return true;
      }

      if (Array.isArray(item.access)) {
        let res = item.access.some((access) => {
          return accessMap[access];
        });

        return res;
      } else {
        // 根据权限配置过滤
        return accessMap[item.access];
      }
    });
  };

  return filterFn(rooteMenu, resourceAccessMap);
};

export const getMenuRoute = (mItem: typeProjectApp, env: enumEnv) => {
  return {
    name: mItem.projectCode,
    entry: mItem.entryEnv[env],
    path: '/' + mItem.projectCode,
    microApp: mItem.projectCode,
  };
};

interface linkAppCfg {
  microApp: string;
  microAppPath: string;
}
export const getMenuLinkAppRoute = (
  mItem: linkAppCfg,
  curApp: any,
  targetLink: any,
) => {
  return {
    name: mItem.microApp,
    path: curApp.path + mItem.microAppPath, // A项目的路径
    entry: targetLink.entry, // B项目的应用入口
    microApp: targetLink.microApp, // 匹配到B项目的应用
  };
};
export const getSubAppMenuCfg = (
  menuList: typeProjectApp[] = [],
  env: enumEnv,
) => {
  let apps: {
    /** for menu */
    name: string;
    entry: string;

    /** for routes */
    path: string;
    microApp: string;
  }[] = [];

  menuList?.forEach((obj: typeProjectApp) => {
    apps.push(getMenuRoute(obj, env));
  });

  // 处理嵌套子应用的核心是，将需要link的path也注册到指定子应用
  menuList?.forEach((obj: typeProjectApp) => {
    if (obj.linkApps?.length) {
      let curApp = apps.find((item) => item.microApp === obj.projectCode);

      obj.linkApps.forEach(
        (lItem: { microApp: string; microAppPath: string }) => {
          let targetLink = apps.find(
            (item) => item.microApp === lItem.microApp,
          );
          if (!targetLink) {
            console.error(`${lItem.microApp} targetLink not found`);
            return;
          }
          let linkApp = getMenuLinkAppRoute(lItem, curApp, targetLink);
          apps.push(linkApp);
        },
      );
    }
  });

  return apps;
};
