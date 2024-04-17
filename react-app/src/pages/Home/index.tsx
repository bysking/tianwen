import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const { masterState, setMasterState } = useModel(
    "@@qiankunStateFromMaster"
  );
  return (
    <PageContainer ghost>
      {JSON.stringify(masterState)}
    </PageContainer>
  );
};

export default HomePage;
