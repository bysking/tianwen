import HeaderBlock from '@/components/header-block';
import { getMockApp } from '@/pages/mockapp';
import { filterRouteByPermission, processSubAppMenuItem } from '@/utils/tool';
import { BankTwoTone } from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { Outlet, history, useAppData, useModel, useNavigate } from '@umijs/max';
import { useEffect } from 'react';

const Layout = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  let projectApps = initialState?.projectApps || [];
  let projectAppsPermission = initialState?.projectAppsPermission || [];
  const navigate = useNavigate();
  const location = history.location;

  // 处理如果是mock模式，需要讲mock的子应用路由代替这里的routes getMockApp
  const mockAppData = getMockApp();
  let mockAppList = [mockAppData].filter(Boolean);
  let apps = projectApps;
  if (mockAppList.length) {
    // mock的放在前面
    apps = [...mockAppList, ...projectApps];
  }

  const getCurApp = () => {
    let curPath = window.location.pathname.split('/')[1];
    const curApp = apps.find((app) => {
      return app.projectCode === curPath;
    });

    return curApp;
  };

  useEffect(() => {
    setInitialState({
      ...initialState,
      curApp: getCurApp(),
    });
  }, [location]);

  let curApp = getCurApp();
  const appData = useAppData();
  const defaultRoutes = [];
  Object.keys(appData.routes).forEach((key) => {
    let routeObj = appData.routes[key];
    defaultRoutes.push(routeObj);
  });

  let routes = curApp?.menuRoute.map((mItem) =>
    processSubAppMenuItem(mItem, curApp.projectCode),
  );

  routes = filterRouteByPermission(
    curApp?.projectCode,
    routes,
    projectAppsPermission,
  );

  if (!curApp) {
    routes = defaultRoutes;
  }

  const onPageChange = () => {
    const { location: hisLocation } = history;
    const pathname = hisLocation.pathname;

    // // 如果没有登录，重定向到 login cpx:todo 处理登录
    // if (!access(initialState).canLogin()) {
    //   if (pathname !== LOGIN_PATH) {
    //     Logger.warning('no login, redirect to login page');
    //     goLoginPage();
    //   }
    //   return;
    // }

    if (!getCurApp()) {
      // curApp不存在说明是基座的菜单路由
      return;
    }

    const getPathMap = (routeList: any[], resMap = {}) => {
      const accessRoutePath = routeList.reduce((res, cur) => {
        res[cur.path] = true;

        if (cur.routes?.length) {
          getPathMap(cur.routes, resMap);
        }
        return res;
      }, resMap);

      return accessRoutePath;
    };

    // 拥有权限的path列表
    let pathAccessMap = getPathMap([...defaultRoutes, ...routes]);
    if (!pathAccessMap[pathname]) {
      console.error('check path access enable false to 403');

      // cpx:todo 可以优化下，有路由没有权限，和没有路由跳转404这两种场景
      navigate('/403', { replace: true });
    }
  };

  return (
    <div>
      <ProLayout
        route={routes}
        // location={{
        //   pathname: '/',
        // }}
        siderWidth={256}
        menuProps={{ inlineIndent: 16 }}
        //   actionRef={layoutActionRef}
        disableMobile={false}
        loading={false}
        // waterMarkProps={waterMarkProps}
        //   disableContentMargin
        fixSiderbar
        // fixedHeader={true}
        //   collapsed={initialState?.collapsed}
        onCollapse={(collapsed: boolean) => {
          // setInitialState((s) => ({ ...s, collapsed }));
        }}
        // rightContentRender={() => <RightContent />}
        // footerRender={() => <Footer />}
        menu={{
          params: {
            curApp,
          },
          request: async () => {
            onPageChange(); // 处理直接输入没有权限的路由，手动触发一次页面变化逻辑
            // 动态请求的菜单
            return routes;
          },
        }}
        onPageChange={onPageChange}
        //   onMenuHeaderClick={onMenuHeaderClick}
        menuHeaderRender={() => {
          return (
            <div
              onClick={() => {
                navigate('/welcome', { replace: true });
              }}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <BankTwoTone
                style={{
                  fontSize: '32px',
                }}
              />
            </div>
          );
        }}
        menuItemRender={(item, defaultDom) => {
          return <a onClick={() => navigate(item.path)}>{defaultDom}</a>;
        }}
        pure={false}
        contentStyle={{
          padding: 0,
        }}
      >
        <HeaderBlock />
        <Outlet />
      </ProLayout>
    </div>
  );
};

export default Layout;
