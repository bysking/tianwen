const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const app = new Koa();

const Router = require("koa-router");

const router = new Router({
  prefix: "/api",
});

router.get("/hello", async (ctx, next) => {
  await new Promise((res) => {
    setTimeout(async () => {
      res();
    }, 1000);
  });

  await next();
  ctx.res.end("111");
});

app.use(bodyParser()); // 解析request的body
app.use(router.routes());

// 在端口8081监听:
app.listen(8081, () => {
  console.log("app is running on: http://localhost:8081");
});
