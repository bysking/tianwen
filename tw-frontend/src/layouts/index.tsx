import { getMockApp } from '@/pages/mockapp';
import { ProLayout } from '@ant-design/pro-components';
import { Link, Outlet } from '@umijs/max';

const layoutSettings = {
  // route: {
  //   path: '/',
  //   routes: [
  //     {
  //       path: '/welcome',
  //       name: '欢迎',
  //       component: './Welcome',
  //     },
  //     {
  //       path: '/admin',
  //       name: '管理页',
  //       component: './Admin',
  //       routes: [
  //         {
  //           path: '/admin/sub-page1',
  //           name: '一级页面',
  //           component: './Welcome',
  //         },
  //         {
  //           path: '/admin/sub-page2',
  //           name: '二级页面',
  //           component: './Welcome',
  //         },
  //         {
  //           path: '/admin/sub-page3',
  //           name: '三级页面',
  //           component: './Welcome',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // appList: [
  //   {
  //     icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  //     title: 'Ant Design',
  //     desc: '杭州市较知名的 UI 设计语言',
  //     url: 'https://ant.design',
  //   },
  //   {
  //     icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
  //     title: 'AntV',
  //     desc: '蚂蚁集团全新一代数据可视化解决方案',
  //     url: 'https://antv.vision/',
  //     target: '_blank',
  //   },
  //   {
  //     icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
  //     title: 'Pro Components',
  //     desc: '专业级 UI 组件库',
  //     url: 'https://procomponents.ant.design/',
  //   },
  // ],
};
const mockAppData = getMockApp();
const mockRouteList = [];

if (mockAppData) {
  mockRouteList.push(mockAppData);
}

const routes = [
  {
    path: '/welcome',
    name: '欢迎',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: '管理页2',
    routes: [
      {
        path: '/admin/sub-page1',
        name: '一级页面',
        component: './Welcome',
      },
      {
        path: '/admin/sub-page2',
        name: '二级页面',
        component: './Welcome',
      },
      {
        path: '/admin/sub-page3',
        name: '三级页面',
        component: './Welcome',
      },
    ],
  },
  {
    name: '子应用',
    path: '/app1',
    routes: [
      {
        name: 'app1-layout',
        path: '/app1/*',
      },
    ],
  },
  ...mockRouteList,
];

const Layout = (props: typeProps) => {
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
        {...layoutSettings}
        //   collapsed={initialState?.collapsed}
        onCollapse={(collapsed: boolean) => {
          // setInitialState((s) => ({ ...s, collapsed }));
        }}
        // rightContentRender={() => <RightContent />}
        // footerRender={() => <Footer />}
        menu={{
          request: async () => {
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
      >
        <Outlet />
      </ProLayout>
    </div>
  );
};

export default Layout;
