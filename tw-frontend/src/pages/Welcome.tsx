import { useModel } from '@umijs/max';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { clearApp, getMockApp, setMockApp } from './mockapp';

const Welcome = () => {
  const [appCfg, setAppCfg] = useState({});

  const { menuData, setMenuData } = useModel('global');

  const updateMenu = () => {
    setMenuData([
      {
        name: Math.random(),
      },
    ]);
  };
  const initData = async () => {
    const appList = await getMockApp();
    setAppCfg(appList);
  };

  useEffect(() => {
    initData();
  }, []);

  // 主应用获取暴露给子应用的数据
  const { masterState, setMasterState } = useModel('@@qiankunStateForSlave');

  const onFinish = (values: any) => {
    setMockApp(values);
    window.location.reload();
  };

  const clear = () => {
    clearApp();
    window.location.reload();
  };

  return (
    <div>
      欢迎{masterState}
      <div>
        {/* <div>本地appMock</div>
        <Form onFinish={onFinish}>
          <Form.Item label="title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="name" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="entry" name="entry">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Button type="primary" onClick={clear}>
          清除
        </Button> */}
        <Button type="primary" onClick={updateMenu}>
          更新menuDATA
        </Button>
        {JSON.stringify(menuData)}
      </div>
    </div>
  );
};

export default Welcome;
