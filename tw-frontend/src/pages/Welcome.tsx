import { useModel } from '@umijs/max';

const Welcome = () => {
  // 主应用获取暴露给子应用的数据
  const { masterState, setMasterState } = useModel('@@qiankunStateForSlave');
  return <div>欢迎{masterState}</div>;
};

export default Welcome;
