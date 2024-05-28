const Controller = require('egg').Controller;
const roleAccessData = require('../data-mock/role-access');

/** 获取用户菜单权限应用配置: cpx:todo 后期走云服务配置中心获取，区分环境dev,prod,test, uat */
class UserController extends Controller {
  /** 根据用户token获取当前登录的用户信息 */
  async userInfo() {
    // this.ctx.body = 'Hello world'
    const ctx = this.ctx;
    ctx.body = {
      code: 0,
      data: {
        id: 12345,
        email: 'bysking@qq.com',
        cnName: 'bysking',
        status: 'ACTIVE',
        mobilePhoneMask: '159*****505',
      },
      success: true,
    };
  }
  async roleAccess() {
    // this.ctx.body = 'Hello world'
    const ctx = this.ctx;
    ctx.body = {
      code: 0,
      data: roleAccessData,
      success: true,
    };
  }

  async authToken() {
    const ctx = this.ctx;
    ctx.body = {
      code: 0,
      data: {
        token: 'bear bysking token' + Math.random(),
      },
      success: true,
    };
  }
}

module.exports = UserController;
