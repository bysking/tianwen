import FormEditor from '@/components/editor';
import { useModel } from '@umijs/max';
import { Button, Form } from 'antd';
import { useEffect, useState } from 'react';
import { clearApp, getMockApp, setMockApp } from './mockapp';

const Welcome = () => {
  const defaultData = getMockApp();
  const [appCfg, setAppCfg] = useState(defaultData);
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
    let json = JSON.parse(values.text);
    setMockApp(json);
    window.location.reload();
  };

  const clear = () => {
    clearApp();
    window.location.reload();
  };

  return (
    <div>
      <div>
        <div style={{ margin: '8px' }}>
          代理本地子应用配置:entryEnv.local 和 menuRoute的内容
        </div>
        <Form
          onFinish={onFinish}
          initialValues={{
            text: JSON.stringify(defaultData, null, 2),
          }}
        >
          <Form.Item name="text">
            <FormEditor />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Button type="primary" onClick={clear}>
          清除
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
