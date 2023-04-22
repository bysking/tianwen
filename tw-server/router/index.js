const Router = require("koa-router");

const router = new Router({
  prefix: "/api",
});

require("./module-a")(router); // 注册模块

router.get("/hello", async (ctx, next) => {
  await new Promise((res) => {
    setTimeout(async () => {
      res();
    }, 1000);
  });

  await next();
  ctx.res.end("111");
});

module.exports = router;
