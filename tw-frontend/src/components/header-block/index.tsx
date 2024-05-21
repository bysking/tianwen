import { history, useModel } from '@umijs/max';
import { Button, Tag } from 'antd';

const HeaderBlock = () => {
  const { initialState } = useModel('@@initialState');
  let projectApps = initialState?.projectApps || [];
  projectApps = projectApps.map((obj) => {
    return {
      appName: obj.appName,
      path: '/' + obj.projectCode,
    };
  });

  console.log(projectApps, 'projectApps');
  return (
    <div>
      应用列表
      <div style={{ display: 'flex' }}>
        {projectApps.map((item: any) => {
          return (
            <div key={item.projectCode}>
              <Button
                onClick={() => {
                  history.push(item.path);
                }}
                type="link"
              >
                <Tag color="green">{item.appName}</Tag>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeaderBlock;
