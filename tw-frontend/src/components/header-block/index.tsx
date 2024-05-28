import { getMockApp } from '@/pages/mockapp';
import { loginOut } from '@/utils/data-tool';
import { AppstoreTwoTone } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Button, Drawer, Tag } from 'antd';
import { useState } from 'react';

const HeaderBlock = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  let projectApps = initialState?.projectApps || [];
  const mockAppData = getMockApp();
  let mockAppList = [mockAppData].filter(Boolean);

  projectApps = [...projectApps, ...mockAppList];
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ padding: '16px 16px', borderBottom: '1px solid #ccc' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          justifyContent: 'flex-end',
        }}
        onClick={showDrawer}
      >
        <AppstoreTwoTone />
        更多系统
        <Button
          type="link"
          onClick={() => {
            loginOut();
          }}
        >
          logout
        </Button>
      </div>
      <Drawer
        title="Basic Drawer"
        placement="top"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <div style={{ display: 'flex' }}>
          {projectApps.map((item: any) => {
            return (
              <div key={item.projectCode}>
                <Button
                  onClick={() => {
                    setInitialState({
                      ...initialState,
                      curApp: item,
                    });
                    history.push(`/${item.projectCode}`);
                    onClose();
                  }}
                  type="link"
                >
                  <Tag color="green">{item.appName}</Tag>
                </Button>
              </div>
            );
          })}
        </div>
      </Drawer>
    </div>
  );
};

export default HeaderBlock;
