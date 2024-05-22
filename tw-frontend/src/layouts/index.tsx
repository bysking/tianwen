import HeaderBlock from '@/components/header-block';
import { getMockApp } from '@/pages/mockapp';
import { filterRouteByPermission, processSubAppMenuItem } from '@/utils/tool';
import { ProLayout } from '@ant-design/pro-components';
import { Link, Outlet, useAppData, useModel } from '@umijs/max';
import { useEffect } from 'react';

const Layout = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  let projectApps = initialState?.projectApps || [];
  let projectAppsPermission = initialState?.projectAppsPermission || [];

  // 处理如果是mock模式，需要讲mock的子应用路由代替这里的routes getMockApp
  const mockAppData = getMockApp();
  let mockAppList = [mockAppData].filter(Boolean);
  let apps = projectApps;
  if (mockAppList.length) {
    // mock的放在前面
    apps = [...mockAppList, ...projectApps];
  }

  useEffect(() => {
    let curPath = window.location.pathname.split('/')[1];
    const curApp = apps.find((app) => {
      return app.projectCode === curPath;
    });
    setInitialState({
      ...initialState,
      curApp,
    });
  }, []);

  let curApp = initialState.curApp;
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
            // console.log('request', routes);
            // 动态请求的菜单
            return routes;
          },
        }}
        //   onPageChange={onPageChange}
        //   onMenuHeaderClick={onMenuHeaderClick}
        //   menuHeaderRender={() => {
        //     const app = usingSubApp; // getCurrentSubAppData(microAppsConfig, usingSubApp.current);
        //     // Logger.info('current app:', app);
        //     return (
        //       <div className="app-layout-tf">
        //         <img
        //           src={
        //             app && app?.logo
        //               ? app?.logo
        //               : initialState?.collapsed
        //               ? DefaultlogoSingle
        //               : Defaultlogo
        //           }
        //           alt={app?.appName}
        //         />
        //       </div>
        //     );
        //   }}
        itemRender={(routeItem, _, routes) => {
          const { breadcrumbName, title, path } = routeItem;
          const label = title || breadcrumbName;
          const last = routes[routes.length - 1];
          if (last) {
            if (last.path === path || last.linkPath === path) {
              return <span>{label}</span>;
            }
          }
          return <Link to={path}>{label}</Link>;
        }}
        menuItemRender={(item, dom, menuProps) => {
          const isTopLevelItem = (menuProps.menuData || []).find(
            ({ path }) => path === item.path,
          );
          return isTopLevelItem ? (
            <Link className={'mainapp-cusmenuitem-container'} to={item.path!}>
              <>{dom}</>
            </Link>
          ) : (
            <Link
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '16px',
              }}
              to={item.path!}
            >
              <>
                {/* {item.icon} */}
                {dom}
              </>
            </Link>
          );
        }}
        subMenuItemRender={(item, dom) => {
          // console.log('subMenuItemRender item', item, menuProps);
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
              className="mainapp-cusmenuitem-container"
            >
              {/* {item.icon} */}
              {dom}
            </div>
          );
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
