import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import { Button } from 'antd';

const HomePage: React.FC = () => {
  const { name } = useModel('global');

  // 子应用获取主应用暴露的数据
  const { masterState, setMasterState } = useModel(
    "@@qiankunStateFromMaster"
  );
  return (
    <PageContainer ghost>
      {JSON.stringify(masterState)}
      <Button onClick={() => setMasterState(Math.random())}>更新全局数据</Button>
    </PageContainer>
  );
};

export default HomePage;
