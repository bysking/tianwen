const Router = require("koa-router");

const router = new Router({
  prefix: "/api",
});

require("./login")(router); // 注册模块
require("./module-a")(router); // 注册模块

module.exports = router;
