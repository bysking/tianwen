const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
require("./db");

const app = new Koa();
app.use(bodyParser()); // 解析request的body

const router = require("./router");

app.use(router.routes());

// 在端口8081监听:
app.listen(8081, () => {
  console.log("app is running on: http://localhost:8081");
});
