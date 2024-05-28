const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // this.ctx.body = 'Hello world'
    const ctx = this.ctx;
    ctx.body = {
      message: ctx.__('Email'),
      // 或者使用 gettext，gettext 是 `__` 函数的别名
      // message: ctx.gettext('Welcome back', ctx.user.name)
      //   user: ctx.user,
    };
  }
}

module.exports = HomeController;
