import { Spin } from 'antd';
import styles from './style.less';

type LoadingProps = {
  tip?: string;
};

const Loading = ({ tip }: LoadingProps) => (
  <div className={styles.spinContainer}>
    <Spin tip={tip} className={styles.spin} />
  </div>
);

export default Loading;
