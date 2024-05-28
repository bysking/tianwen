import { goWelcomePage } from '@/utils/tool';
import { Button } from 'antd';

const Login = () => {
  return (
    <div>
      Login
      <Button onClick={goWelcomePage}>登录成功，跳转首页</Button>
    </div>
  );
};

export default Login;
