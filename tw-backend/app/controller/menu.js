const Controller = require('egg').Controller;
const menuData = require('../data-mock/menu');

/** 获取用户菜单权限应用配置: cpx:todo 后期走云服务配置中心获取，区分环境dev,prod,test, uat */
class MenuController extends Controller {
  async menuConfigWithPermit() {
    // this.ctx.body = 'Hello world'
    const ctx = this.ctx;
    ctx.body = {
      code: 0,
      data: menuData,
      success: true,
    };
  }
}

module.exports = MenuController;
