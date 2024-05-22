let roleData = {
  userId: '12345',
  projectAccess: [
    {
      projectCode: 'reactApp',
      projectName: 'reactApp名字',
      projectDesc: 'reactApp描述',
      roleList: ['reactApp:admin'],
      resourceList: [
        {
          resourceCode: 'reactApp:TASK_LIST',
          constraintList: [
            {
              constraintCode: 'reactApp:options',
              constraintItem: ['create', 'view'],
            },
          ],
        },
      ],
    },
    {
      projectCode: 'reactDemo',
      projectName: 'reactDemo名字',
      projectDesc: 'reactDemo描述',
      roleList: ['reactDemo:admin'],
      resourceList: [
        {
          resourceCode: 'reactDemo:api',
          constraintList: [
            {
              constraintCode: 'reactDemo:options',
              constraintItem: ['view'],
            },
          ],
        },
        {
          resourceCode: 'reactDemo:auth_list',
          constraintList: [
            {
              constraintCode: 'reactDemo:options',
              constraintItem: ['view'],
            },
          ],
        },
      ],
    },
  ],
};

module.exports = roleData;
