import { Spin } from 'antd';

type LoadingProps = {
  tip?: string;
};
// indicator={antIcon}
export default ({ tip }: LoadingProps) => (
  <div>
    <Spin tip={tip} />
  </div>
);
