const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
require("./db");

const app = new Koa();
app.use(bodyParser()); // 解析request的body

// 处理跨域
app.use(
  cors({
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization", "Date"],
    maxAge: 100,
    credentials: true,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Custom-Header",
      "anonymous",
    ],
  })
);

const router = require("./router");
app.use(router.routes());

// 在端口8081监听:
app.listen(8081, () => {
  console.log("app is running on: http://localhost:8081");
});
