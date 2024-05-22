import { history } from '@umijs/max';
import { Button, Result } from 'antd';

export default function (error: Error) {
  return (
    <Result
      status="500"
      title="500"
      subTitle={'Sorry, something went wrong.' + error.message}
      extra={
        <Button
          onClick={() => {
            history.replace('/');
          }}
          type="primary"
        >
          Back Home
        </Button>
      }
    />
  );
}
