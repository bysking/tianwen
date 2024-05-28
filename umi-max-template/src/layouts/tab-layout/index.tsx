import { eventBus, eventNameMap } from '@/utils/event-emitter';
// 清除缓存
// eventBus.emit(eventNameMap.clearRouteState, {
//   path: '/collect-mgr/collectInfo'
// });
import { HolderOutlined } from '@ant-design/icons';
import {
  KeepAlive,
  history,
  useAppData,
  useLocation,
  useNavigate,
  useOutlet,
} from '@umijs/max';
import { Tabs } from 'antd';
import { useEffect, useRef } from 'react';
import Styles from './index.less';

const keepAlivePathList: string[] = [];

const TabLayout = () => {
  const keepElements = useRef<
    { key: string; child: any; label: string; location: any }[]
  >(window.vflow_keepElements || []);
  const location = useLocation();
  const pathname = location.pathname?.toLowerCase();
  const element = useOutlet();
  const navigate = useNavigate();
  const { routes } = useAppData();
  const tabNameMap = {};

  Object.keys(routes || {}).forEach((key) => {
    let routeObj = routes[key];
    tabNameMap[`${routeObj.path?.toLowerCase()}`] = routeObj.name;
  });

  useEffect(() => {
    eventBus.on(eventNameMap.clearRouteState, ({ path }) => {
      const index = [...keepElements.current].findIndex((obj) => {
        return obj.key === `${path}`.toLowerCase();
      });

      if (index !== -1) {
        let target = [...keepElements.current][index];
        target.location.state = {};
        keepElements.current.splice(index, 1, {
          ...target,
        });
      }
    });
  }, []);

  const hasTab = (pathname: string) => {
    return keepElements.current.some((item) => item.key === pathname);
  };

  /** 操作keepElements.current后，缓存到window，解决跳转外部页面后页面刷新，之前打开的tab消失 */
  const updateToWindow = () => {
    window.vflow_keepElements = keepElements.current;
  };
  const closeTab = (key: string) => {
    const index = keepElements.current.findIndex((item) => item.key === key);
    if (keepElements.current.length > 1) {
      keepElements.current.splice(index, 1);
      updateToWindow();

      const target = keepElements.current[keepElements.current.length - 1];
      const { pathname, hash, search, state } = target?.location;
      navigate(`${pathname}${search}${hash}`, {
        state,
      });
    }
  };
  const enableKeep = () => {
    const targetPath = history.location.pathname;
    // 全流程监控页面需要响应跳转带参查询，不能缓存
    const isKeepTarget = !!keepAlivePathList.find(
      (path) => targetPath.indexOf(path) !== -1,
    );

    if (targetPath.endsWith('/mytodo/todolist') && !!location.search) {
      return false;
    }

    return isKeepTarget ? true : false;
  };
  const RenderDom = () => {
    // const cacheRes = enableKeep();
    return (
      <>
        <KeepAlive when={true} id={`${location.pathname?.toLowerCase()}`}>
          {element}
        </KeepAlive>
      </>
    );
  };

  if (!hasTab(pathname) && pathname !== '/') {
    keepElements.current.push({
      key: pathname,
      label: tabNameMap[pathname],
      child: <RenderDom />,
      location,
    });
    updateToWindow();
  } else {
    // 需要更新location，因为有的路由参数的state会变化
    const targetDom = keepElements.current.find((obj) => obj.key === pathname);
    if (targetDom) {
      targetDom.location = location;
      updateToWindow();
    }
  }
  const targetDom = keepElements.current.find((obj) => obj.key === pathname);

  return (
    <>
      <Tabs
        hideAdd
        onChange={(key: string) => {
          const target = keepElements.current.find((obj) => obj.key === key);
          const { pathname, hash, search, state } = target?.location;
          navigate(`${pathname}${search}${hash}`, {
            state,
          });
        }}
        size="small"
        items={[...keepElements.current]}
        activeKey={`${location.pathname?.toLowerCase()}`}
        type="editable-card"
        className={Styles['tab-wrap']}
        onEdit={(key: string) => {
          closeTab(key?.toLowerCase());
        }}
        moreIcon={
          <div style={{ background: '#fff', width: '60px', fontSize: '12px' }}>
            更多 <HolderOutlined />
          </div>
        }
      ></Tabs>
      {targetDom?.child || element}
    </>
  );
};

export default TabLayout;
