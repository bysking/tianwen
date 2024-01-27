const session = require("koa-session");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
require("./db");

const app = new Koa();
// 处理跨域
app.use(
  cors({
    origin: "*",
    exposeHeaders: [
      "WWW-Authenticate",
      "Server-Authorization",
      "Date",
      "bysking",
    ],
    maxAge: 100,
    credentials: true,
    // rolling: true,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Custom-Header",
      "bysking",
    ],
  })
);
app.keys = ["test"];
app.use(bodyParser()); // 解析request的body
app.use(
  session(
    {
      key: "koa:sess", // 默认的cookie名称
      maxAge: 100, // session过期时间，单位：毫秒
      overwrite: true, // 是否覆盖已有的同名cookie，默认为true
      httpOnly: false, // 是否只能通过http访问cookie，默认为true
      signed: true, // 是否对cookie进行签名，默认为true
    },
    app
  )
);

const router = require("./router");
app.use(router.routes());

// 在端口8081监听:
app.listen(8081, () => {
  console.log("app is running on: http://localhost:8081");
});
